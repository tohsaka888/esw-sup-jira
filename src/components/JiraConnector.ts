import { Version3Client } from "jira.js";
import * as vscode from "vscode";
import { FindAssignableUsers, SearchProjects } from "jira.js/out/version3/parameters";

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
 * @returns If the server time is not null, then true is being returned.
 */
  async loginAuthenticated() {
    try {
      if((await JiraConnector.client?.serverInfo.getServerInfo()!).serverTime !==null){
        return true;
      }
    } catch (error) {
      vscode.window.showErrorMessage("User not login,Please login first");
    }
  }


/**
 * The above function is an asynchronous function that retrieves all projects from a Jira server using
 * the JiraConnector client.
 * @returns The getAllProjects function is returning the result of the
 * JiraConnector.client.projects.searchProjects() method call.
 */
  async getAllProjects() {
    try {
      return await JiraConnector.client?.projects.searchProjects({});
    } catch (error) {
      vscode.window.showErrorMessage("GetProjects fail,Pleace try again!");
    }
  }


/**
 * The function `getProjectStatuses` is an asynchronous function that retrieves the statuses of a
 * project in Jira using the JiraConnector client.
 * @param {string} projectIdOrKey - A string representing the ID or key of the project for which you
 * want to retrieve the statuses.
 * @returns the result of the JiraConnector.client?.projects.getAllStatuses(projectIdOrKey) method
 * call.
 */
  async getProjectStatuses(projectIdOrKey: string) {
    try {
      return await JiraConnector.client?.projects.getAllStatuses(
        projectIdOrKey
      );
    } catch (error) {
      vscode.window.showErrorMessage("Get statuses fail,Pleace try again!");
    }
  }




/**
 * The function `getProjectIssues` retrieves issues from Jira based on the project name or ID and an
 * optional status.
 * @param  - - `projectNameOrId`: The name or ID of the project for which you want to retrieve issues.
 * @returns the result of the JiraConnector.client?.issueSearch.searchForIssuesUsingJql() method, which
 * is a Promise that resolves to the search results for issues in the specified project and with the
 * specified status.
 */
  async getProjectIssues({ projectNameOrId, status ,assigneeFullNameOrId}: { projectNameOrId: string, status?: string ,assigneeFullNameOrId?:string}) {
    try {
      const statusJql = status ? ` and status=${status}` : "";
      const assigneeJql = assigneeFullNameOrId ? ` and assignee=${assigneeFullNameOrId}` : "";
      return await JiraConnector.client?.issueSearch.searchForIssuesUsingJql({
        jql: `project=${projectNameOrId}${statusJql}${assigneeJql} and hierarchyLevel=0`,
      });
    } catch (error) {
      vscode.window.showErrorMessage("Get issues fail,Pleace try again!");
    }
  }


/**
 * The function `getProjectUsers` is an asynchronous function that retrieves assignable users for a
 * given project using the JiraConnector client.
 * @param {FindAssignableUsers}  - - `project`: The project for which to find assignable users.
 * @returns the result of the JiraConnector.client?.userSearch.findAssignableUsers({ project }) method
 * call.
 */
  async getProjectUsers({ project }: FindAssignableUsers) {
    try {
      return await JiraConnector.client?.userSearch.findAssignableUsers({ project });
    } catch (error) {
      vscode.window.showErrorMessage("Get users fail,Pleace try again!");
    }
  }
}

export const jiraConnector = JiraConnector.getInstance();
