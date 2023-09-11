import * as vscode from "vscode";
import { jiraConnector } from "./JiraConnector";
import { Issue } from "jira.js/out/version3/models/issue";

type OtherProps = {
  type: "project" | "issue" | "subtask";
  _id: string | number;
  description?: string;
  contextValue: string;
  subtasks?: Issue[];
};

class JiraTreeItem extends vscode.TreeItem {
  type: "project" | "issue" | "subtask";
  _id: string | number;
  subtasks?: Issue[];
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    { type, description, contextValue, _id, subtasks }: OtherProps
  ) {
    super(label, collapsibleState);
    this.description = description;
    this.contextValue = contextValue;
    this._id = _id;
    this.type = type;
    this.subtasks = subtasks;
  }
  tooltip = this.label;
}

class JiraTreeProvider implements vscode.TreeDataProvider<JiraTreeItem> {
  private static instance: JiraTreeProvider | null = null;
  private _onDidChangeTreeData: vscode.EventEmitter<JiraTreeItem | undefined> =
    new vscode.EventEmitter<JiraTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<JiraTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  private constructor() {}

  static getInstance(): JiraTreeProvider {
    if (!JiraTreeProvider.instance) {
      JiraTreeProvider.instance = new JiraTreeProvider();
    }
    return JiraTreeProvider.instance;
  }

  getTreeItem(element: JiraTreeItem): vscode.TreeItem {
    // 创建并返回一个 TreeItem 实例
    return element;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  // 实现 dispose 方法
  dispose(): void {
    this._onDidChangeTreeData.dispose();
  }

  async getChildren(element?: JiraTreeItem): Promise<JiraTreeItem[]> {
    if (element) {
      // 如果有父节点，则异步获取其子节点
      if (element.type === "project") {
        const response = await jiraConnector.getProjectIssues(
          element._id as string
        );
        return Promise.resolve(
          response?.issues?.map(
            (treeItem) =>
              new JiraTreeItem(
                `${treeItem.key} ${treeItem.fields.summary}`,
                treeItem.fields.subtasks.length
                  ? vscode.TreeItemCollapsibleState.Collapsed
                  : vscode.TreeItemCollapsibleState.None,
                {
                  type: "issue",
                  _id: treeItem.key,
                  // description: treeItem.fields.summary,
                  contextValue: "issue",
                  subtasks: treeItem.fields.subtasks,
                }
              )
          ) || []
        );
      } else {
        return Promise.resolve(
          element?.subtasks?.map(
            (treeItem) =>
              new JiraTreeItem(
                `${treeItem.key} ${treeItem.fields.summary}`,
                vscode.TreeItemCollapsibleState.None,
                {
                  type: "subtask",
                  _id: treeItem.key,
                  // description: treeItem.fields.summary,
                  contextValue: "subtask",
                }
              )
          ) || []
        );
      }
    } else {
      const response = await jiraConnector.getAllProjects();
      return Promise.resolve(
        response?.values.map(
          (treeItem) =>
            new JiraTreeItem(
              treeItem.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              {
                type: "project",
                _id: treeItem.key,
                // description: treeItem.name,
                contextValue: "project",
              }
            )
        ) || []
      );
    }
  }
}

export const jiraTreeProvider = JiraTreeProvider.getInstance();
