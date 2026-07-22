import checkOwner from "../../utils/checkOwner.js";

import {
    SlashCommandBuilder
} from "discord.js";

import scheduleService from "../../services/scheduleService.js";


export default {


    data:new SlashCommandBuilder()

        .setName("testschedule")

        .setDescription(
            "Create test schedule"
        ),



    async execute(interaction){


        const schedule =
            scheduleService.create({


                name:"meeting test",


                message:
                "Ini test scheduler",



                datetime:
                new Date(
                    Date.now()+60000
                ),



                timezone:
                "Asia/Jakarta",



                notifications:[

                    {
                        label:"1 Menit Sebelum",
                        offset:-60
                    },


                    {
                        label:"Hari H",
                        offset:0
                    }

                ],



                targets:[

                    {
                        type:"dm",
                        userId:
                        interaction.user.id
                    }

                ],



                createdBy:
                interaction.user.id


            });



interaction.reply({

    content:
    `Schedule test dibuat
ID:
${schedule.id}`,

    flags:64

});

    }


};