// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { JiraTreeItem, jiraTreeProvider } from "./components/SideMenu";
import { jiraConnector } from "./components/JiraConnector";
import { projectFilter } from "./components/ProjectFilter";
import shell from "shelljs";
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
      "esw-sup-jira.copy-issue-key",
      (props: JiraTreeItem) => {
        vscode.env.clipboard.writeText(props._id.toString());
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "esw-sup-jira.copy-issue-key-and-name",
      (props: JiraTreeItem) => {
        vscode.env.clipboard.writeText(props.label);
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "esw-sup-jira.checkout",
      (props: JiraTreeItem) => {
        shell.exec(
          `git checkout ${props._id}`,
          { async: true },
          (code, stdout, stderr) => {
            if (!code) {
              vscode.window.showInformationMessage(stdout);
            } else {
              vscode.window.showErrorMessage(JSON.stringify(stderr));
            }
          }
        );
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "esw-sup-jira.project.filter",
      async (props: JiraTreeItem) => {
        const result = await projectFilter.projectFilterSelector(
          props._id.toString()
        );
        props._status = result.status;
        props._assignee = result.assignee;
        jiraTreeProvider.refresh(props);
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
