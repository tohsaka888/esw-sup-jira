// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { JiraTreeItem, jiraTreeProvider } from "./components/SideMenu";
import { jiraConnector } from "./components/JiraConnector";
import { projectFilter } from "./components/ProjectFilter";
// import { jiraPanel } from "./components/WebviewPanel";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "esw-sup-jira" is now active!');
  const projectsView = vscode.window.registerTreeDataProvider(
    "jira-projects",
    jiraTreeProvider
  );
  context.subscriptions.push(projectsView);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // Register Commands
  context.subscriptions.push(
    vscode.commands.registerCommand("esw-sup-jira.login", async () => {
      await jiraConnector.jiraConfig();
      jiraTreeProvider.refresh();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("esw-sup-jira.project.refresh", () => {
      jiraTreeProvider.refresh();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "esw-sup-jira.project.filter",
      async (props: JiraTreeItem) => {
        vscode.window.showWarningMessage(JSON.stringify(props));
        const result = await projectFilter.projectFilterSelector(
          props._id.toString()
        );
        props._status = result?.status;
        vscode.window.showWarningMessage(props._status || '');
        jiraTreeProvider.refresh();
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
