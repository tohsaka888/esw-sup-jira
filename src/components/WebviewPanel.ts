// import * as vscode from "vscode";
// import type {
//   CustomDocument,
//   CancellationToken,
//   WebviewView,
//   WebviewViewResolveContext,
// } from "vscode";
// import { readFileSync } from "fs";
// import path = require("path");

// export class JiraProjectsPanel implements vscode.WebviewViewProvider {
//   context: vscode.ExtensionContext;
//   contents: { [key: string]: any } | null = null;
//   constructor(context: vscode.ExtensionContext) {
//     this.context = context;
//   }

//   async resolveWebviewView(
//     webviewView: WebviewView,
//     context: WebviewViewResolveContext,
//     token: CancellationToken
//   ) {
//     webviewView.webview.options = {
//       enableScripts: true,
//       localResourceRoots: [this.context.extensionUri],
//     };
//     webviewView.webview.html = `123123123`;
//   }

//   private getWebviewContent(webviewPanel: WebviewView) {
//     const extensionUri = this.context.extensionUri;
//     const staticUri = vscode.Uri.joinPath(extensionUri, "dist/web/");

//     let webviewContent = readFileSync(
//       vscode.Uri.joinPath(extensionUri, "dist/web/index.html").fsPath,
//       {
//         encoding: "utf-8",
//       }
//     );

//     console.log(webviewContent);

//     webviewContent = webviewContent.replace(
//       "BASE_URL",
//       webviewPanel.webview.asWebviewUri(staticUri).toString()
//     );

//     return webviewContent;
//   }
// }

import * as vscode from 'vscode';

export class JiraProjectsProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    // 设置 Webview 的 HTML 内容
    this._view.webview.html = this._getHtmlForWebview();

    // 监听 Webview 中的消息
    this._view.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'alert':
          vscode.window.showErrorMessage(message.text);
          return;
      }
    });
  }

  private _getHtmlForWebview() {
    return `
      <html>
        <body>
          <h1>Hello, Jira Projects!</h1>
          <button onclick="alert('Hello, World!')">Say Hello</button>
        </body>
      </html>
    `;
  }
}

