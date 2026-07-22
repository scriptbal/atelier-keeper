import { Events } from "discord.js";

export default {

    name: Events.InteractionCreate,

    once: false,


    async execute(...args) {


        console.log(
            "INTERACTION CREATE ARGS:",
            args
        );


        const interaction = args[0];


        console.log(
            "INTERACTION VALUE:",
            interaction?.constructor?.name
        );


        if (
            !interaction?.isChatInputCommand()
        ) {
            return;
        }


        const client =
            interaction.client;


        const command =
            client.commands.get(
                interaction.commandName
            );


        if(!command){
            return;
        }


        try {

            await command.execute(
                interaction
            );

        }
        catch(error){

            console.error(error);


            if(
                !interaction.replied &&
                !interaction.deferred
            ){

                await interaction.reply({

                    content:
                    "Terjadi kesalahan saat menjalankan command.",

                    ephemeral:true

                });

            }

        }


    }

};