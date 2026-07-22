import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";

import scheduleService from "../../services/scheduleService.js";

import embed from "../../utils/embed.js";


import channels from "../../config/channels.js";

import reminderParser 
from "../../utils/reminderParser.js";

import notificationModel
from "../../models/notificationModel.js";


import users from "../../config/users.js";


export default {

    data: new SlashCommandBuilder()

        .setName("schedule")

        .setDescription("Create a schedule")


        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Schedule name")
                .setRequired(true)
        )


        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("Message")
                .setRequired(true)
        )


.addStringOption(option =>
    option
        .setName("date")
        .setDescription("Tanggal DD-MM-YYYY")
        .setRequired(true)
)

.addStringOption(option =>
    option
        .setName("time")
        .setDescription("Jam HH:mm")
        .setRequired(true)
)

.addStringOption(option =>
    option
        .setName("reminder")
        .setDescription(
            "Pengingat contoh: 10menit, 1jam, 1hari, 1minggu"
        )
        .setRequired(true)
),



    async execute(interaction) {


        const name =
            interaction.options.getString("name");


        const message =
            interaction.options.getString("message");


        const date =
            interaction.options.getString("date");


const time =
interaction.options.getString("time");


const reminder =
interaction.options.getString("reminder");

const reminderSeconds =
reminderParser(reminder);


if(reminderSeconds === 0){

    return interaction.reply({

        content:
        "❌ Format reminder salah.\nContoh:\n10menit\n1jam\n1hari\n1minggu",

        ephemeral:true

    });

}




const [
    day,
    month,
    year
] = date.split("-");


if(!day || !month || !year){

    return interaction.reply({

        content:
        "❌ Format tanggal salah. Gunakan DD-MM-YYYY\nContoh: 22-07-2026",

        ephemeral:true

    });

}


const datetime =
new Date(
    `${year}-${month.padStart(2,"0")}-${day.padStart(2,"0")}T${time}:00+07:00`
);


if(isNaN(datetime.getTime())){

    return interaction.reply({

        content:
        "❌ Tanggal atau jam tidak valid.\n\nContoh:\nTanggal: 22-07-2026\nJam: 23:30",

        ephemeral:true

    });

}






    console.log(
    "OWNER:",
    interaction.user.id
);

console.log(
    "PARTNER:",
    users.partner
);


console.log({
date,
time,
datetime,
valid:
!isNaN(datetime.getTime())
});


        const schedule =
            scheduleService.create({

                name,

                message,


                datetime,


notifications:[


notificationModel.create(

    reminder,

    -reminderSeconds

),



    notificationModel.create(

        "Hari H",

        0

    )

],


                createdBy:
                    interaction.user.id,


targets:[

    {
        type:"channel",
        channelId:
            channels.reminder
    },


    {
        type:"dm",
        userId:
            interaction.user.id
    },


    {
        type:"dm",
        userId:
            users.partner
    }

]



            });




            const ingetin =
    interaction.guild.channels.cache.get(
        channels.ingetin
    );


if(ingetin){

    await ingetin.send({

        embeds:[

            embed.success(

                "📅 Schedule Created",

                `**${schedule.name}**\n\n`+

                `📝 ${schedule.message}\n`+

                `🕒 ${datetime.toLocaleString(
                    "id-ID"
                )}\n\n`+

                `🆔 ${schedule.id}`

            )

        ]

    });

}


await interaction.reply({

    content:
    "✅ Schedule berhasil dibuat.",

    ephemeral:true

});


    }

};