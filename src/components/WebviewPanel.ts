import * as vscode from "vscode";
import type {
  CancellationToken,
  WebviewView,
  WebviewViewResolveContext,
} from "vscode";
import { readFileSync } from "fs";

export class JiraProjectsPanel implements vscode.WebviewViewProvider {
  context: vscode.ExtensionContext;
  contents: { [key: string]: any } | null = null;
  _view?: vscode.WebviewView;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  async resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };
    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
    this._view = webviewView;
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private getWebviewContent(webview: vscode.Webview) {
    const extensionUri = this.context.extensionUri;
    const staticUri = vscode.Uri.joinPath(extensionUri, "dist/web/");

    let webviewContent = readFileSync(
      vscode.Uri.joinPath(extensionUri, "dist/web/index.html").fsPath,
      {
        encoding: "utf-8",
      }
    );

    webviewContent = webviewContent.replace(
      "BASE_URL",
      webview.asWebviewUri(staticUri).toString()
    );

    console.log(webviewContent);
    return webviewContent;
  }
}
