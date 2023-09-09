// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { JiraConnector } from "./components/JiraConnector";
import { JiraTreeProvider } from "./components/SideMenu";
import { jiraConfig } from "./components/Configure";
import { jiraPanel } from "./components/WebviewPanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "esw-sup-jira" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const commandHandlers = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "esw-sup-jira.login": jiraConfig,
  };
  // Register Commands
  for (const [commandName, commandHandler] of Object.entries(commandHandlers)) {
    const disposable = vscode.commands.registerCommand(
      commandName,
      commandHandler
    );
    context.subscriptions.push(disposable);
  }
  jiraPanel.webview.postMessage("Hello world");
}

// This method is called when your extension is deactivated
export function deactivate() {}
