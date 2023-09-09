// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { JiraConnector } from "./components/JiraConnector";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "esw-sup-jira" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "esw-sup-jira.login",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const baseUrl = await vscode.window.showInputBox({
        placeHolder: "Please enter your Jira Site Url",
        value: "",
      });
      const email = await vscode.window.showInputBox({
        placeHolder: "Please enter your Jira bind email",
        value: "",
      });
      const apiToken = await vscode.window.showInputBox({
        placeHolder: "Please enter your Jira api token",
        value: "",
        password: true,
      });
      JiraConnector.getInstance({
        email: email!,
        baseUrl: baseUrl!,
        apiToken: apiToken!,
      });
      vscode.window.showInformationMessage(
        `${baseUrl} - ${email} - ${apiToken}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
