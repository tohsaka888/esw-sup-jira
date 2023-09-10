import { SiderTreeItem } from "src/types/SiderTree";
import * as vscode from "vscode";

export class JiraTreeProvider implements vscode.TreeDataProvider<JiraTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<JiraTreeItem | undefined> =
    new vscode.EventEmitter<JiraTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<JiraTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  private treeItems: JiraTreeItem[] = [];
  getTreeItem(element: JiraTreeItem): vscode.TreeItem {
    return element;
  }

  refresh(treeItems: SiderTreeItem[]): void {
    this.treeItems = [];
    treeItems.forEach((treeItem) => {
      const element = new JiraTreeItem(
        treeItem.title,
        vscode.TreeItemCollapsibleState[treeItem.type],
        treeItem.description,
        treeItem.contextValue
      );
      this.treeItems.push(element);
      this._onDidChangeTreeData.fire(element);
    });
  }

  // 实现 dispose 方法
  dispose(): void {
    this._onDidChangeTreeData.dispose();
  }

  getChildren(element?: JiraTreeItem): Thenable<JiraTreeItem[]> {
    // 返回树形视图的子节点
    return Promise.resolve(this.treeItems);
  }
}

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
