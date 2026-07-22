import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";


import scheduleRepository from "../../repository/scheduleRepository.js";

import embed from "../../utils/embed.js";



export default {


data:

new SlashCommandBuilder()

.setName("schedule-info")

.setDescription("Show schedule detail")

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
    scheduleRepository.getById(id);



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



    const notifications =

    schedule.notifications

    .map(notification => {


        const status =
        notification.status === "sent"
        ? "✅"
        : "⏳";


        return (

`${status} **${notification.label}**
Status: ${notification.status}`

        );


    })

    .join("\n\n");



    const targets =

    schedule.targets

    .map(target => {

        if(target.type === "dm"){

            return `💬 DM <@${target.userId}>`;

        }


        return target.type;


    })

    .join("\n");




    await interaction.reply({

        embeds:[

            embed.info(

                `📅 ${schedule.name}`,

`${schedule.message}

🕒 Event:
<t:${Math.floor(
schedule.event.timestamp / 1000
)}:F>


🔔 Notifications:

${notifications}


🎯 Targets:

${targets || "Tidak ada"}

🆔 ID:

\`${schedule.id}\``

            )

        ]

    });


}


};