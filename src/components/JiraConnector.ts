import { JiraConnectorProps } from "../types/JiraConnector";
import { Version3Client } from "jira.js";
import * as vscode from "vscode";

export class JiraConnector {
  private static instance: JiraConnector;
  static client?: Version3Client;

  constructor() {}

  public static getInstance(): JiraConnector {
    if (!JiraConnector.instance) {
      JiraConnector.instance = new JiraConnector();
    }
    return JiraConnector.instance;
  }

  // 创建Jira连接器
  async jiraConfig() {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const baseUrl = await vscode.window.showInputBox({
      placeHolder: "Please enter your Jira Site Url",
      value: "",
      ignoreFocusOut: true,
    });
    const email = await vscode.window.showInputBox({
      placeHolder: "Please enter your Jira bind email",
      value: "",
      ignoreFocusOut: true,
    });
    const apiToken = await vscode.window.showInputBox({
      placeHolder: "Please enter your Jira api token",
      value: "",
      password: true,
      ignoreFocusOut: true,
    });
    if (email && apiToken && baseUrl) {
      JiraConnector.client = new Version3Client({
        host: baseUrl,
        authentication: {
          basic: {
            email,
            apiToken,
          },
        },
      });
    } else {
      vscode.window.showErrorMessage("Please input a valid value!");
    }
  }

  // TODO: 获取登录用户参与的所有项目
  // 获取用户相关的所有项目
  async getAllProjects() {
    try {
      return await JiraConnector.client?.projects.searchProjects();
    } catch (error) {
      vscode.window.showErrorMessage(JSON.stringify(error));
    }
  }

  // TODO: 获取某个项目的所有状态

  // TODO: 获取用户参与的某个项目中的某个状态的事务
}
