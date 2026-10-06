import * as vscode from 'vscode';
import * as xlsx from "xlsx";
import { AssetStorage } from './assets/AssetStorage';
import { loadExcel } from './lib/excelLoader';


function createIcon(context: vscode.ExtensionContext) {
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    
	statusBarItem.command = 'vscode-extension-excel-sample.viewExcelSample';
    statusBarItem.text = `$(play) Excel View Sample`; // $(play) は横三角のアイコン
    statusBarItem.tooltip = 'サンプルのExelファイルを表示します';
	statusBarItem.color = "#00ff00";
    statusBarItem.show();

	context.subscriptions.push(statusBarItem);
}


export function activate(context: vscode.ExtensionContext) {
	createIcon(context);

	const asset = new AssetStorage(context);

	const disposable = vscode.commands.registerCommand('vscode-extension-excel-sample.viewExcelSample', () => {
		vscode.window.showInformationMessage('Hello World from vscode-extension-excel-sample!');

		const workbookUri = asset.getUri("dist/assets/excel/sample.xlsx");
		vscode.window.showInformationMessage(workbookUri.fsPath);

		const sheet = loadExcel(workbookUri);
		const html = sheet ? xlsx.utils.sheet_to_html(sheet) : `<h1>Cannot access to "Sample.xlsx"</h1>`;
		
		const view = vscode.window.createWebviewPanel(
			"wev_view_panel",
			"sample.xlsx",
			{ viewColumn: vscode.ViewColumn.One }
		);
		view.webview.html = html;
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
