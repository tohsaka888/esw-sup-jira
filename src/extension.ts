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
  let loginStatus: { url: string; email: string; apiToken: string } = {
    url: "",
    email: "",
    apiToken: "",
  };
  try {
    const loginStatusStr = context.globalState.get<string>("loginStatus") || "";
    loginStatus = JSON.parse(loginStatusStr);
  } catch (error) {
    vscode.window.showWarningMessage(
      "No login status found, please login first."
    );
  }

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
      await jiraConnector.jiraConfig(loginStatus);
      jiraTreeProvider.refresh();
      jiraConnector.getLoginStatusFromCache(context);
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
        const folders = vscode.workspace.workspaceFolders;
        shell.cd(folders ? folders[0].uri.fsPath : "~");
        shell.exec(
          `git checkout -b ${props._id}`,
          { async: true },
          (code, stdout, stderr) => {
            if (!code) {
              vscode.window.showInformationMessage(`Checkout to ${props._id}`);
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
