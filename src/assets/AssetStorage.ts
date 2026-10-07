import * as vscode from "vscode";

export class AssetStorage {
    private readonly buildDir = 'dist';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {}

    /**
     * @param pathFromRoot
     * 例: 'assets/data.json'
     */
    public getUri(pathFromRoot: string): vscode.Uri {
        const path = pathFromRoot.replace(/^\/+/, '');
        return vscode.Uri.joinPath(this.context.extensionUri, this.buildDir, path);
    }

    /**
     * @param pathFromRoot
     * 例: 'assets/data.json'
     */
    public async loadJson<T>(pathFromRoot: string): Promise<T> {
        const uri = this.getUri(pathFromRoot);
        const rawData = await vscode.workspace.fs.readFile(uri);
        return JSON.parse(new TextDecoder().decode(rawData));
    }
}
