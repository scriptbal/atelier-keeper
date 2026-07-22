import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";

import scheduleRepository from "../../repository/scheduleRepository.js";

import embed from "../../utils/embed.js";


export default {

    data:

    new SlashCommandBuilder()

        .setName("schedule-cancel")

        .setDescription("Cancel a schedule")

        .addStringOption(option =>

            option

                .setName("id")

                .setDescription("Schedule ID")

                .setRequired(true)

        ),


    async execute(interaction){


        const id =
            interaction.options.getString("id");


        const schedule =
            scheduleRepository.findById(id);



        if(!schedule){

            return interaction.reply({

                embeds:[

                    embed.error(

                        "❌ Not Found",

                        "Schedule tidak ditemukan."

                    )

                ],

                ephemeral:true

            });

        }



        scheduleRepository.update(

            id,

            {

                status:"cancelled",

                cancelledAt:
                    new Date().toISOString()

            }

        );



        await interaction.reply({

            embeds:[

                embed.warning(

                    "🗑 Schedule Cancelled",

                    `
Schedule berhasil dibatalkan.

**${schedule.name}**

ID:
\`${id}\`
                    `

                )

            ]

        });


    }


};