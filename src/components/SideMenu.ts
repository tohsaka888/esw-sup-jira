import { SiderTreeItem } from "src/types/SiderTree";
import * as vscode from "vscode";
import { jiraConnector } from "./JiraConnector";

class JiraTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    description?: string,
    contextValue?: string
  ) {
    super(label, collapsibleState);
    this.description = description;
    this.contextValue = contextValue;
  }
  tooltip = this.label;
}

class JiraTreeProvider implements vscode.TreeDataProvider<JiraTreeItem> {
  private static instance: JiraTreeProvider | null = null;

  private _onDidChangeTreeData: vscode.EventEmitter<JiraTreeItem | undefined> =
    new vscode.EventEmitter<JiraTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<JiraTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  private treeItems: JiraTreeItem[] = [];

  private constructor() {
    // 私有构造函数
  }

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
      return [];
      // 如果有父节点，则异步获取其子节点
      const response = await jiraConnector.getAllProjects();
      return Promise.resolve(
        response?.values.map(
          (treeItem) =>
            new JiraTreeItem(
              treeItem.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              treeItem.description
            )
        ) || []
      );
    } else {
      const response = await jiraConnector.getAllProjects();
      return Promise.resolve(
        response?.values.map(
          (treeItem) =>
            new JiraTreeItem(
              treeItem.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              treeItem.description
            )
        ) || []
      );
    }
  }
}

export const jiraTreeProvider = JiraTreeProvider.getInstance();
