class Logger {

    getTime() {

        return new Date().toLocaleTimeString(
            "id-ID",
            {
                hour12: false
            }
        );

    }

    print(level, module, message) {

        console.log(

            `[${this.getTime()}] [${level}] [${module}] ${message}`

        );

    }

    info(module, message) {

        this.print(

            "INFO",

            module,

            message

        );

    }

    success(module, message) {

        this.print(

            "SUCCESS",

            module,

            message

        );

    }

    warn(module, message) {

        this.print(

            "WARN",

            module,

            message

        );

    }

    error(module, message) {

        this.print(

            "ERROR",

            module,

            message

        );

    }

    debug(module, message) {

        this.print(

            "DEBUG",

            module,

            message

        );

    }

}

export default new Logger();