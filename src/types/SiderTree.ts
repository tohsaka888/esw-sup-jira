import { Project } from "jira.js/out/version3/models";

export type SiderTreeItem = {
  title: string;
  icon?: string;
  key: string;
  description?: string;
  contextValue?: string;
  type: "None" | "Collapsed" | "Expanded";
} & Project;
