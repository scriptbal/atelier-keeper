import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";

import scheduleRepository from "../../repository/scheduleRepository.js";
import embed from "../../utils/embed.js";

export default {

    data: new SlashCommandBuilder()

        .setName("schedule-list")
        .setDescription(
            "Melihat daftar schedule aktif"
        ),

    async execute(interaction){

        const schedules =
            scheduleRepository.getAll();

        const active = schedules
            .filter(
                item => item.status === "active"
            )
            .sort(
                (a,b)=>
                    a.event.timestamp -
                    b.event.timestamp
            );

        if(active.length === 0){

            return interaction.reply({

                embeds:[

                    embed.info(
                        "📅 Schedule",
                        "Tidak ada schedule aktif."
                    )

                ],

                ephemeral:true

            });

        }

        const description =
            active.map((schedule,index)=>{

                const event =
                    new Date(
                        schedule.event.timestamp
                    );

                const diff =
                    schedule.event.timestamp -
                    Date.now();

                let remaining = "";

                if(diff <= 0){

                    remaining =
                        "Sedang berlangsung";

                }
                else{

                    const days =
                        Math.floor(
                            diff / 86400000
                        );

                    const hours =
                        Math.floor(
                            (diff % 86400000)
                            /
                            3600000
                        );

                    const minutes =
                        Math.floor(
                            (diff % 3600000)
                            /
                            60000
                        );

                    if(days > 0){

                        remaining =
                            `${days} hari ${hours} jam lagi`;

                    }
                    else if(hours > 0){

                        remaining =
                            `${hours} jam ${minutes} menit lagi`;

                    }
                    else{

                        remaining =
                            `${minutes} menit lagi`;

                    }

                }

                return [

                    `**${index+1}. ${schedule.name}**`,

                    `📝 ${schedule.message}`,

                    `🕒 ${event.toLocaleString(
                        "id-ID",
                        {
                            weekday:"long",
                            day:"2-digit",
                            month:"long",
                            year:"numeric",
                            hour:"2-digit",
                            minute:"2-digit",
                            timeZone:"Asia/Jakarta"
                        }
                    )}`,

                    `⏳ ${remaining}`,

                    `🆔 \`${schedule.id}\``

                ].join("\n");

            }).join("\n\n");

        await interaction.reply({

            embeds:[

                embed.success(
                    "📅 Active Schedule",
                    description
                )

            ],

            ephemeral:true

        });

    }

};