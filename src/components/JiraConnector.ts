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



/**
 * The function `loginAuthenticated` checks if the user is logged in to Jira and returns `true` if they
 * are, otherwise it shows an error message.
 * @returns a boolean value. If the serverTime is not null, it will return true. Otherwise, if there is
 * an error, it will display an error message and not return anything.
 */
  async loginAuthenticated() {
    try {
      (await JiraConnector.client?.serverInfo.getServerInfo()!).serverTime !== null
      return true;
    } catch (error) {
      vscode.window.showErrorMessage("User not login,Please login first");
    }
  }

  /**
   * The function `getAllProjects` is an asynchronous function that attempts to retrieve all projects
   * from a Jira connector and displays an error message if it fails.
   * @returns The getAllProjects function is returning the result of the
   * JiraConnector.client.projects.searchProjects() method call.
   */
  async getAllProjects() {
    try {
      return await JiraConnector.client?.projects.searchProjects();
    } catch (error) {
      vscode.window.showErrorMessage("GetProjects fail,Pleace try again!");
    }
  }


  /**
   * The function `getAllStatuses` retrieves all statuses for a given project in Jira using the
   * JiraConnector client.
   * @param {string} projectIdOrKey - A string representing the ID or key of the project for which you
   * want to retrieve all statuses.
   * @returns The getAllStatuses function is returning the result of calling the getAllStatuses method of
   * the JiraConnector client with the projectIdOrKey parameter.
   */
  async getAllStatuses(projectIdOrKey: string) {
    try {
      return await JiraConnector.client?.projects.getAllStatuses(
        projectIdOrKey
      );
    } catch (error) {
      vscode.window.showErrorMessage("Get statuses fail,Pleace try again!");
    }
  }


  /**
   * The function `getProjectIssues` is an asynchronous function that retrieves issues from Jira based on
   * a project name or ID and hierarchy level.
   * @param {string} projectNameOrId - A string representing the name or ID of the project for which you
   * want to retrieve the issues.
   * @returns the result of the JiraConnector.client?.issueSearch.searchForIssuesUsingJql() method, which
   * is a promise that resolves to the search results for issues in the specified project.
   */
  async getProjectIssues(projectNameOrId: string) {
    try {
      return await JiraConnector.client?.issueSearch.searchForIssuesUsingJql({
        jql: `project=${projectNameOrId} and hierarchyLevel=0`,
      });
    } catch (error) {
      vscode.window.showErrorMessage("Get issues fail,Pleace try again!");
    }
  }
}

export const jiraConnector = JiraConnector.getInstance();
