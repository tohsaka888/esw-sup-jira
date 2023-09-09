import * as vscode from "vscode";

export class JiraTreeProvider implements vscode.TreeDataProvider<JiraTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<JiraTreeItem | undefined> =
    new vscode.EventEmitter<JiraTreeItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<JiraTreeItem | undefined> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: JiraTreeItem): vscode.TreeItem {
    return element;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(
      new JiraTreeItem("Node 2", vscode.TreeItemCollapsibleState.None)
    );
  }

  // 实现 dispose 方法
  dispose(): void {
    this._onDidChangeTreeData.dispose();
  }

  getChildren(element?: JiraTreeItem): Thenable<JiraTreeItem[]> {
    // 返回树形视图的子节点
    return Promise.resolve([
      new JiraTreeItem(
        "Node 1",
        vscode.TreeItemCollapsibleState.None,
        "ceshi",
        "test"
      ),
      new JiraTreeItem("Node 2", vscode.TreeItemCollapsibleState.None),
      new JiraTreeItem("Node 3", vscode.TreeItemCollapsibleState.None),
    ]);
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
