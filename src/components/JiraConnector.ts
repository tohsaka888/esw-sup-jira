import { JiraConnectorProps } from "../types/JiraConnector";
import { Version3Client } from 'jira.js';

export class JiraConnector {
  private static instance: JiraConnector;
  private email: string;
  private apiToken: string;
  private baseUrl: string;
  private client: Version3Client;

  private constructor(email: string, apiToken: string, baseUrl: string) {
    this.email = email;
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
    this.client = new Version3Client({
      host: this.baseUrl,
      authentication: {
        basic: {
          email: this.email,
          apiToken: this.apiToken,
        },
      },
      newErrorHandling: true,
    });
  }
  test = JiraConnector.getInstance;


  public static getInstance({
    email,
    apiToken,
    baseUrl,
  }: JiraConnectorProps): JiraConnector {
    if (!JiraConnector.instance) {
      JiraConnector.instance = new JiraConnector(email, apiToken, baseUrl);
    }
    return JiraConnector.instance;
  }

  // TODO: 获取登录用户参与的所有项目
  // 获取用户相关的所有项目
  getAllProjects() {
    return this.client.projects.searchProjects();
  }


  // TODO: 获取某个项目的所有状态

  // TODO: 获取用户参与的某个项目中的某个状态的事务
}
