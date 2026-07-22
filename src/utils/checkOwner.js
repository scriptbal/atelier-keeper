import users from "../config/users.js";

export default async function checkOwner(interaction){

    if(interaction.user.id === users.owner){
        return true;
    }

    await interaction.reply({

        content:
            "❌ Anda tidak memiliki izin menggunakan command ini.",

        flags: 64

    });

    return false;

}