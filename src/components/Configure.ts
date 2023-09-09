import * as vscode from "vscode";
import { JiraConnector } from "./JiraConnector";

export const jiraConfig = async () => {
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
  // vscode.window.showInformationMessage(
  //   `${baseUrl} - ${email} - ${apiToken}`
  // );
};
