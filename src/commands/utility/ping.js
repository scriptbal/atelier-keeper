import {

    SlashCommandBuilder

} from "discord.js";

import embed from "../../utils/embed.js";

export default {

    data: new SlashCommandBuilder()

        .setName("ping")

        .setDescription(

            "Check bot latency"

        ),

    async execute(interaction) {

        const latency = Date.now() - interaction.createdTimestamp;

        await interaction.reply({

            embeds: [

                embed.success(

                    "🏓 Pong!",

                    `Bot Latency : **${latency} ms**`

                )

            ]

        });

    }

};