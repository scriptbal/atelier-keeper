import "dotenv/config";

import {

    Client,

    GatewayIntentBits

} from "discord.js";

import loadCommands from "./handlers/commandHandler.js";
import loadEvents from "./handlers/eventHandler.js";

import logger from "./utils/logger.js";

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds

    ]

});

logger.info(

    "SYSTEM",

    "Starting Atelier Keeper..."

);

const commandCount = await loadCommands(

    client

);

logger.info(

    "COMMAND",

    `Loaded ${commandCount} command(s).`

);

const eventCount = await loadEvents(

    client

);

logger.info(

    "EVENT",

    `Loaded ${eventCount} event(s).`

);

await client.login(

    process.env.DISCORD_TOKEN

);