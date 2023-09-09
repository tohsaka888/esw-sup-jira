import * as vscode from "vscode";

export const jiraPanel = vscode.window.createWebviewPanel(
  "exampleWebView", // WebView 面板的标识符
  "示例 WebView", // WebView 面板的标题
  vscode.ViewColumn.One, // WebView 在编辑器中的显示位置
  {}
);
