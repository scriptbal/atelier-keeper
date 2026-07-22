import { Events } from "discord.js";

import logger from "../utils/logger.js";

import scheduler from "../scheduler/scheduler.js";

export default {

    name: Events.ClientReady,

    once: true,

    async execute(client) {

        console.clear();

        console.log("==========================================");
        console.log("            Atelier Keeper");
        console.log("==========================================");

        logger.success(

            "BOT",

            `Logged in as ${client.user.tag}`

        );

        logger.info(

            "BOT",

            `Bot ID : ${client.user.id}`

        );

        logger.info(

            "BOT",

            `Connected to ${client.guilds.cache.size} server(s)`

        );

        logger.success(

            "BOT",

            "Bot is ready."

        );
        
        scheduler.start(client);
    }

};