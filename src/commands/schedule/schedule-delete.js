import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";

import scheduleRepository
from "../../repository/scheduleRepository.js";

import embed
from "../../utils/embed.js";

export default {

    data:
        new SlashCommandBuilder()

            .setName("schedule-delete")

            .setDescription(
                "Delete schedule"
            )

            .addStringOption(option =>

                option

                    .setName("id")

                    .setDescription(
                        "Schedule ID"
                    )

                    .setRequired(true)

            ),

    async execute(interaction){

        const id =
            interaction.options.getString(
                "id"
            );

        const schedule =
            scheduleRepository.getById(id);

        if(!schedule){

            return interaction.reply({

                embeds:[

                    embed.error(

                        "❌ Schedule Not Found",

                        `Schedule dengan ID berikut tidak ditemukan.\n\n\`${id}\``

                    )

                ],

                ephemeral:true

            });

        }

        scheduleRepository.delete(id);

        await interaction.reply({

            embeds:[

                embed.success(

                    "🗑 Schedule Deleted",

                    `**${schedule.name}** berhasil dihapus.\n\n` +

                    `📝 ${schedule.message}\n` +

                    `🆔 \`${schedule.id}\``

                )

            ]

        });

    }

};