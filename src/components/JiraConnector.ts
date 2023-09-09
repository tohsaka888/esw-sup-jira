import { JiraConnectorProps } from "../types/JiraConnector";

export class JiraConnector {
  private static instance: JiraConnector;
  private email: string;
  private apiToken: string;
  private baseUrl: string;

  private constructor(email: string, apiToken: string, baseUrl: string) {
    this.email = email;
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;
  }

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

  // TODO: 获取某个项目的所有状态

  // TODO: 获取用户参与的某个项目中的某个状态的事务
}
