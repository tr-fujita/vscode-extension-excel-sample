## assetsに置いたExcelファイルを使う

`/assets/excel/`の中からExelファイルを読むように設定しました。

```ts
const workbookUri = asset.getUri("assets/excel/sample.xlsx");

// ExcelLoader を用意したので、一行でワークシートを取得できます
const sheet = ExcelLoader.loadFile(workbookUri)?.Sheets[0];
const html = sheet ? xlsx.utils.sheet_to_html(sheet) : `<h1>Cannot access to "Sample.xlsx"</h1>`;

const view = vscode.window.createWebviewPanel(
    "web_view_panel",
    "sample.xlsx",
    { viewColumn: vscode.ViewColumn.One }
);
view.webview.html = html;
```


workBookからシートの名前で探すことも可能です。

```ts
const workBook = ExcelLoader.loadFile(workbookUri);
const sheet = workBook ? ExcelLoader.findBySheetName(workBook, "2026年9月") : null;
```
