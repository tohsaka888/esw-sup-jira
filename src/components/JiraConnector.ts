import { Version3Client } from "jira.js";
import * as vscode from "vscode";
import { SearchProjects } from "jira.js/out/version3/parameters";

class JiraConnector {
  private static instance: JiraConnector | null = null;
  private static client?: Version3Client | null = null;

  private constructor() { }

  public static getInstance(): JiraConnector {
    if (!JiraConnector.instance) {
      JiraConnector.instance = new JiraConnector();
    }
    return JiraConnector.instance;
  }
  /**
   * 
   * @param email 
   * @param apiToken 
   * @param url 
   * @testing
   * @private
   */
  _testJiraConnect(email: string, apiToken: string, url: string) {
    JiraConnector.client = new Version3Client({
      host: url,
      authentication: {
        basic: {
          email: email,
          apiToken: apiToken,
        },
      },
    });
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


  //校验登录状态
  loginAuthenticated() {
    if (!!JiraConnector.client?.serverInfo) {
      vscode.window.showErrorMessage("Connection refused,Please try again!");
    }
    return !!JiraConnector.client?.serverInfo;
  }
  // TODO: 获取登录用户参与的所有项目
  // 获取用户相关的所有项目
  async getAllProjects() {
    try {
      return await JiraConnector.client?.projects.searchProjects();
    } catch (error) {
      vscode.window.showErrorMessage("GetProjects fail,Pleace try again!");
    }
  }

  // TODO: 获取项目所有状态
  async getAllStatuses(projectIdOrKey: string) {
    try {
      return await JiraConnector.client?.projects.getAllStatuses(projectIdOrKey);
    } catch (error) {
      vscode.window.showErrorMessage("GetStatuses fail,Pleace try again!");
    }
  }

  // TODO: 获取用户参与的某个项目中的某个状态的事务
  async getProjectIssues(projectNameOrId: string) {
    try {
      return await JiraConnector.client?.issueSearch.searchForIssuesUsingJql({ jql: `project=${projectNameOrId}` });
    } catch (error) {
      vscode.window.showErrorMessage("GetIssues fail,Pleace try again!");
    }
  }
}

export const jiraConnector = JiraConnector.getInstance();
