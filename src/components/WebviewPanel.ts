// import * as vscode from "vscode";
// import { jiraConfig } from "./Configure";
// import { JiraConnector } from "./JiraConnector";

// export class JiraProjectsPanel implements vscode.WebviewViewProvider {
//   static _view?: vscode.WebviewView;
//   _doc?: vscode.TextDocument;

//   constructor(private readonly _extensionUri?: vscode.Uri) {}

//   public resolveWebviewView(webviewView: vscode.WebviewView) {
//     JiraProjectsPanel._view = webviewView;

//     webviewView.webview.options = {
//       // 在 webview 允许脚本
//       enableScripts: true,
//       localResourceRoots: [this._extensionUri!],
//     };

//     webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

//     webviewView.onDidChangeVisibility(async (e: any) => {
//         const { email, baseUrl, apiToken } = await jiraConfig();
//         const jiraConnector = JiraConnector.getInstance({
//           email,
//           apiToken,
//           baseUrl,
//         });
//         const response = await jiraConnector.getAllProjects();
//         const projects = await response.values;
//         webviewView.webview.postMessage({ type: "projects", values: projects });
//     });
//   }

//   public revive(panel: vscode.WebviewView) {
//     JiraProjectsPanel._view = panel;
//   }

//   private _getHtmlForWebview(webview: vscode.Webview) {
//     const scriptUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(this._extensionUri!, "build", "static/js/main.js")
//     );
//     const styleMainUri = webview.asWebviewUri(
//       vscode.Uri.joinPath(this._extensionUri!, "build", "main.css")
//     );

//     return `<!DOCTYPE html>
// 			<html lang="en">
// 			<head>
// 				<meta charset="UTF-8">
// 				<!--
// 					Use a content security policy to only allow loading images from https or from our extension directory,
// 					and only allow scripts that have a specific nonce.
//         -->
//         <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource};">
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 				<link href="${styleMainUri}" rel="stylesheet">
        
//         <script>
//           const tsvscode = acquireVsCodeApi();
//           const apiBaseUrl = 'https://cnodejs.org/'
//         </script>
// 			</head>
//       <body>
//       <div id="root"></div>
//       <script src="${scriptUri}"></script>
// 			</body>
// 			</html>`;
//   }
// }
