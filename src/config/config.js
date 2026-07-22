const config = {

    bot: {

        name: "Atelier Keeper",

        version: "1.0.0",

        developer: "Shossuki"

    },

    discord: {

        guildId: process.env.GUILD_ID,

        ownerId: process.env.OWNER_ID

    },

    channels: {

        reminder: process.env.REMINDER_CHANNEL_ID,

        moderator: process.env.MODERATOR_CHANNEL_ID,

        announcement: process.env.ANNOUNCEMENT_CHANNEL_ID,

        log: process.env.LOG_CHANNEL_ID

    },

    roles: {

        moderator: process.env.MODERATOR_ROLE_ID

    },

    reminder: {

        timezone: "Asia/Jakarta",

        checkInterval: 60000

    }

};

export default config;