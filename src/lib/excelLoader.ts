import * as vscode from "vscode";
import * as xlsx from "xlsx";
import * as fs from "node:fs";

xlsx.set_fs(fs);

export const loadExcel = (
    sheetUri: vscode.Uri
) => {
    try {
        const workbookPath = sheetUri.fsPath;

        const workbook = xlsx.readFile(workbookPath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        return sheet;
    } catch (err: unknown) {
        if (err instanceof Error) {
            const message = err.message;
            vscode.window.showErrorMessage(message);
            return;
        }

        vscode.window.showErrorMessage('Unknown Error');
    }
};
