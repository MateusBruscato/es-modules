import { writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export class Repository {
    constructor({ fileName }) {
        const currentFilePath = fileURLToPath(import.meta.url);
        const databasePath = path.resolve(path.dirname(currentFilePath), `./../${fileName}`);
        this.filePath = databasePath;
    }

    async save(data) {
        const currentData = await this.getAll();
        currentData.push(data);
        await writeFile(this.filePath, JSON.stringify(currentData, null, 2));
    }

    async getAll() {
        const data = await readFile(this.filePath);
        return JSON.parse(data);
    }
}