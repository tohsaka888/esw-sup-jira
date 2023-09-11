// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { jiraConnector } from "../../components/JiraConnector";
import { expect } from "chai";
// import * as myExtension from '../../extension';
import { describe, it } from "mocha";
suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  describe('Get API test', () => {

    // it('getAllProjects', async () => {
    //   const con = jiraConnector;
    //   con._testJiraConnect(
    //     'diandian.sun@bitech-automotive.com',
    //     'ATATT3xFfGF0BZ81nsWhSxwcQv6KbEJz83QgTObSL89BlLRy3PsAe1a6V21F8UjZRfHKy9Dbid_KNX2niRLZ3N2i9wrEsn4ZEtF1HNz3_CzojFnCxSPe-9oHE4xk-unLNC8rTNZpUC7WWpU1aXAw2B_8dGA3_C2_xRg_CU5fDj6QnV3Q6BDAXd0=1A860B01',
    //     'https://bitech-automotive.atlassian.net/'
    //   )
    //   const projects = await con.getAllProjects();
    //   console.log(JSON.stringify(projects?.values));
    // })

    // it('getAllStatuses', async () => {
    //   const con = jiraConnector;
    //   con._testJiraConnect(
    //     'diandian.sun@bitech-automotive.com',
    //     'ATATT3xFfGF0BZ81nsWhSxwcQv6KbEJz83QgTObSL89BlLRy3PsAe1a6V21F8UjZRfHKy9Dbid_KNX2niRLZ3N2i9wrEsn4ZEtF1HNz3_CzojFnCxSPe-9oHE4xk-unLNC8rTNZpUC7WWpU1aXAw2B_8dGA3_C2_xRg_CU5fDj6QnV3Q6BDAXd0=1A860B01',
    //     'https://bitech-automotive.atlassian.net/'
    //   )
    //   const statuses = (await con.getAllStatuses('10003'))!;
    //   console.log(JSON.stringify(statuses[0]));
    // })
    
    // it('getProjectIssues', async () => {
    //   const con = jiraConnector;
    //   con._testJiraConnect(
    //     'diandian.sun@bitech-automotive.com',
    //     'ATATT3xFfGF0BZ81nsWhSxwcQv6KbEJz83QgTObSL89BlLRy3PsAe1a6V21F8UjZRfHKy9Dbid_KNX2niRLZ3N2i9wrEsn4ZEtF1HNz3_CzojFnCxSPe-9oHE4xk-unLNC8rTNZpUC7WWpU1aXAw2B_8dGA3_C2_xRg_CU5fDj6QnV3Q6BDAXd0=1A860B01',
    //     'https://bitech-automotive.atlassian.net/'
    //   )
    //   const issues = (await con.getProjectIssues('AiYL_TestProject_ScrumTemplate'))!;
    //   console.log(JSON.stringify(issues.issues?.map(issue => issue.id)));
    // })


    it('getProjectIssues', async () => {
      const con = jiraConnector;
      con._testJiraConnect(
        'diandian.sun@bitech-automotive.com',
        'ATATT3xFfGF0BZ81nsWhSxwcQv6KbEJz83QgTObSL89BlLRy3PsAe1a6V21F8UjZRfHKy9Dbid_KNX2niRLZ3N2i9wrEsn4ZEtF1HNz3_CzojFnCxSPe-9oHE4xk-unLNC8rTNZpUC7WWpU1aXAw2B_8dGA3_C2_xRg_CU5fDj6QnV3Q6BDAXd0=1A860B01',
        'https://bitech-automotive.atlassian.net/'
      )
      const issues = (await con.loginAuthenticated())!;
      console.log();
    })

  })
});
