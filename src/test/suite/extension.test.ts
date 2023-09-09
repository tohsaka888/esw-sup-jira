import { JiraConnector } from '../../components/JiraConnector';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Get All API test', () => {
		const con = JiraConnector.getInstance({
			baseUrl: 'https://bitech-automotive.atlassian.net',
			email: 'shiyi.wang@bitech-automotive.com',
			apiToken: 'ATATT3xFfGF0R6YVWPzM5ZHyNkKjIxYTNAbRKFGtgRwHwpyIOIlbUNTQA9CntO_0P7rcELMfN1CXEPmP9ndPJFXguZRaHNJ6mWugD-z6YvfnUtC9Qh8P__IOo4TF5uEu_17AUGR0B26Xy7b58C0Q7KGnu-XS-XelX5Aed1TRGn20fyNV2NjQS-s=607B4078'
		});
		console.log(con.getAllProjects());
	});

});
