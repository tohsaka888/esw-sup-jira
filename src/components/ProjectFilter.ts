import * as vscode from "vscode";
import { jiraConnector } from "./JiraConnector";
import { StatusDetails } from "jira.js/out/version3/models";
import { removeDuplicates } from "../utils/removeDuplicates";
class ProjectFilter {
  private filterMode?: { label: string; description: string; key: number };
  private static instance: ProjectFilter;
  private projectIdorKey: string = "";
  private constructor() {}
  static getInstance(): ProjectFilter {
    if (!ProjectFilter.instance) {
      ProjectFilter.instance = new ProjectFilter();
    }
    return ProjectFilter.instance;
  }

  async getSelectedProjectStatus() {
    const statusList = await jiraConnector.getProjectStatuses(
      this.projectIdorKey
    );
    const selectedStatus = await vscode.window.showQuickPick(
      [
        { label: "全部", key: undefined, id: undefined },
        ...removeDuplicates<StatusDetails>(
          statusList?.flatMap((status) => status.statuses) || [],
          "name"
        ).map((status) => ({
          ...status,
          label: status.name!,
          key: status.id,
        })),
      ] || [],
      {
        placeHolder: "Please select issue status",
        matchOnDescription: true,
        matchOnDetail: true,
      }
    );
    return { status: selectedStatus?.id };
  }

  async getSelectedAssignee() {
    const assigneeList = await jiraConnector.getProjectUsers({
      project: this.projectIdorKey,
    });
    const selectedAssignee = await vscode.window.showQuickPick(
      [
        { label: "全部", key: undefined, id: undefined },
        ...(assigneeList?.map((assignee) => ({
          label: assignee.displayName!,
          key: assignee.accountId,
          id: assignee.accountId,
        })) || []),
      ],
      {
        placeHolder: "Please select a assignee",
        matchOnDescription: true,
        matchOnDetail: true,
      }
    );
    return { assignee: selectedAssignee?.id };
  }

  async projectFilterSelector(
    projectIdorKey: string
  ): Promise<{ assignee?: string; status?: string }> {
    this.projectIdorKey = projectIdorKey;
    this.filterMode = await vscode.window.showQuickPick(
      [
        {
          label: "01 - filter by issue status",
          description: "filter by issue status",
          key: 1,
        },
        {
          label: "02 - filter by assignee",
          description: "filter by issue assignee",
          key: 2,
        },
        {
          label: "03 - filter by issue status and assignee",
          description: "filter by issue status and assignee",
          key: 3,
        },
      ],
      {
        placeHolder: "Please select a filter way",
        matchOnDescription: true,
      }
    );
    if (this.filterMode) {
      if (this.filterMode.key === 1) {
        return await this.getSelectedProjectStatus();
      } else if (this.filterMode.key === 2) {
        return await this.getSelectedAssignee();
      } else {
        const status = await this.getSelectedProjectStatus();
        const assignee = await this.getSelectedAssignee();
        return { ...status, ...assignee };
      }
    } else {
      return { assignee: "", status: "" };
    }
  }
}

export const projectFilter = ProjectFilter.getInstance();
