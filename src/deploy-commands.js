import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
    REST,
    Routes
} from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const commandPath = path.join(__dirname, "commands");

const folders = fs.readdirSync(commandPath);

for (const folder of folders) {

    const files = fs
        .readdirSync(path.join(commandPath, folder))
        .filter(file => file.endsWith(".js"));

    for (const file of files) {

        const command = await import(
            `./commands/${folder}/${file}`
        );

        commands.push(
            command.default.data.toJSON()
        );

    }

}

const rest = new REST({
    version: "10"
}).setToken(process.env.DISCORD_TOKEN);

try {

    console.log(
        `Deploying ${commands.length} command(s)...`
    );

    await rest.put(

        Routes.applicationGuildCommands(

            process.env.CLIENT_ID,

            process.env.GUILD_ID

        ),

        {
            body: commands
        }

    );

    console.log("Commands deployed successfully.");

} catch (error) {

    console.error(error);

}