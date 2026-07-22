import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";


import scheduleRepository from "../../repository/scheduleRepository.js";

import embed from "../../utils/embed.js";



export default {


    data:

    new SlashCommandBuilder()

        .setName("schedule-edit")

        .setDescription(
            "Edit schedule"
        )


        .addStringOption(option =>

            option

            .setName("id")

            .setDescription(
                "Schedule ID"
            )

            .setRequired(true)

        )


        .addStringOption(option =>

            option

            .setName("name")

            .setDescription(
                "New name"
            )

        )


        .addStringOption(option =>

            option

            .setName("message")

            .setDescription(
                "New message"
            )

        ),




    async execute(interaction){


        const id =
            interaction.options.getString(
                "id"
            );


        const name =
            interaction.options.getString(
                "name"
            );


        const message =
            interaction.options.getString(
                "message"
            );




        const schedule =
            scheduleRepository.findById(id);



        if(!schedule){


            await interaction.reply({

                embeds:[

                    embed.error(

                        "❌ Not Found",

                        "Schedule tidak ditemukan."

                    )

                ],

                ephemeral:true

            });


            return;

        }





        scheduleRepository.update(

            id,

            {

                ...(name && {
                    name
                }),


                ...(message && {
                    message
                })

            }

        );





        await interaction.reply({

            embeds:[

                embed.success(

                    "✏️ Schedule Updated",

                    `Schedule berhasil diperbarui.\n\nID:\n\`${id}\``

                )

            ]

        });



    }


};