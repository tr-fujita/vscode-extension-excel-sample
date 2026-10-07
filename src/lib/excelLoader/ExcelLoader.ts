import * as vscode from "vscode";
import * as xlsx from "xlsx";
import * as fs from "node:fs";


xlsx.set_fs(fs);

const loadFile = (
    workBookUri: vscode.Uri
): xlsx.WorkBook | null => {
    try {
        const workbookPath = workBookUri.fsPath;
        const workbook = xlsx.readFile(workbookPath);

        return workbook;
    } catch (err: unknown) {
        if (err instanceof Error) {
            const message = err.message;
            vscode.window.showErrorMessage(message);
            return null;
        }

        vscode.window.showErrorMessage('Unknown Error');
        return null;
    }
};

const findBySheetName = (
    workBook: xlsx.WorkBook, sheetName: string
): xlsx.WorkSheet | null => {
    const sheets = workBook.SheetNames;
    const isSheet = sheets.some(s => s === sheetName);

    return isSheet ? workBook.Sheets[sheetName] : null;
};


export const ExcelLoader = {
    loadFile,
    findBySheetName
};
