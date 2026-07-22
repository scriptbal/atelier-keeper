import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function loadCommands(client) {

    client.commands = new Map();

    const commandsPath = path.join(
        __dirname,
        "..",
        "commands"
    );

    const folders = fs.readdirSync(commandsPath);

    let totalCommands = 0;

    for (const folder of folders) {

        const files = fs

            .readdirSync(

                path.join(commandsPath, folder)

            )

            .filter(file => file.endsWith(".js"));

        for (const file of files) {

            const command = await import(

                `../commands/${folder}/${file}`

            );

            client.commands.set(

                command.default.data.name,

                command.default

            );

            totalCommands++;

        }

    }

    return totalCommands;

}