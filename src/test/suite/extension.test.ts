import * as assert from 'assert';
import { Version3Client } from 'jira.js';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('string concatenation test', () => {
		const client = new Version3Client({
			host: 'https://bitech-automotive.atlassian.net',
			authentication: {
				basic: {
					email: 'shiyi.wang@bitech-automotive.com',
					apiToken: 'ATATT3xFfGF0R6YVWPzM5ZHyNkKjIxYTNAbRKFGtgRwHwpyIOIlbUNTQA9CntO_0P7rcELMfN1CXEPmP9ndPJFXguZRaHNJ6mWugD-z6YvfnUtC9Qh8P__IOo4TF5uEu_17AUGR0B26Xy7b58C0Q7KGnu-XS-XelX5Aed1TRGn20fyNV2NjQS-s=607B4078',
				},
			},
			newErrorHandling: true,
		});
		// async function main() {
		// 	const projects = await client.projects.searchProjects();
		// 	console.log(projects);
		// }
	});
});
