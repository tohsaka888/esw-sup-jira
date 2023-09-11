import * as vscode from "vscode";
import { jiraConnector } from "./JiraConnector";
class ProjectFilter {
  private filterMode?: { label: string; description: string; key: number };
  private static instance: ProjectFilter;
  private constructor() {}
  static getInstance(): ProjectFilter {
    if (!ProjectFilter.instance) {
      ProjectFilter.instance = new ProjectFilter();
    }
    return ProjectFilter.instance;
  }
  async projectFilterSelector() {
    this.filterMode = await vscode.window.showQuickPick(
      [
        {
          label: "01 - filter by issue status",
          description: "filter by issue status",
          key: 1,
        },
        {
          label: "02 - filter by assignee",
          description: "filter by issue status and assignee",
          key: 2,
        },
        {
          label: "03 - filter by issue status and assignee",
          description: "description3",
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
        const statusList =  await jiraConnector
      } else if (this.filterMode.key === 2) {
      } else {
      }
    } else {
      vscode.window.showWarningMessage("No filter item selected!");
    }
  }
}

export const projectFilter = ProjectFilter.getInstance();
