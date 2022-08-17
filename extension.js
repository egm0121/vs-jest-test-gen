// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const run = require('jest-test-gen').run;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vs-jest-test-gen.generateForCurrentFile', function () {
		// The code you place here will be executed every time your command is executed
		if (!vscode.window.activeTextEditor) return;
		const activeDocument = vscode.window.activeTextEditor.document;
		if (activeDocument.uri.scheme !== 'file' ) return;
		let testFilename = '';
		try {
			testFilename = run({ _: [activeDocument.fileName] });
		} catch (err) {
			vscode.window.showErrorMessage('Failed to generate tests :(', [err.toString()]);
		}
		const generatedTestFileUri = vscode.Uri.file(testFilename);
		vscode.window.showTextDocument(generatedTestFileUri);
		// Display a message box to the user
		vscode.window.showInformationMessage(`Generated ${path.basename(testFilename)}`);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
