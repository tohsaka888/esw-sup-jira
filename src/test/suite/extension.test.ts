// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { expect } from "chai";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Get All API test", async () => {
    // const con = JiraConnector.getInstance();
    // const projects = await con.getAllProjects();
    // console.log(JSON.stringify(projects.values));
    // expect(projects.values).to.be.an("array");
  });
});
