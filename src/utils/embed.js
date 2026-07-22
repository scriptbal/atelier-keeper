import {

    EmbedBuilder

} from "discord.js";

import config from "../config/config.js";

class EmbedFactory {

    create(color, title, description) {

        return new EmbedBuilder()

            .setColor(color)

            .setTitle(title)

            .setDescription(description)

            .setFooter({

                text: `${config.bot.name} • v${config.bot.version}`

            })

            .setTimestamp();

    }

    success(title, description) {

        return this.create(

            0x57F287,

            title,

            description

        );

    }

    info(title, description) {

        return this.create(

            0x5865F2,

            title,

            description

        );

    }

    warning(title, description) {

        return this.create(

            0xFEE75C,

            title,

            description

        );

    }

    error(title, description) {

        return this.create(

            0xED4245,

            title,

            description

        );

    }

}

export default new EmbedFactory();