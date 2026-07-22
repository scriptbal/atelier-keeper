class TimeParser {

    now() {

        return new Date();

    }

    addSeconds(seconds) {

        return new Date(

            Date.now() +

            seconds * 1000

        );

    }

    addMinutes(minutes) {

        return new Date(

            Date.now() +

            minutes * 60 * 1000

        );

    }

    addHours(hours) {

        return new Date(

            Date.now() +

            hours * 60 * 60 * 1000

        );

    }

    addDays(days) {

        return new Date(

            Date.now() +

            days * 24 * 60 * 60 * 1000

        );

    }

    parse(text) {

    const value = text

        .trim()

        .toLowerCase();

    if (value.endsWith("detik")) {

        const number = parseInt(value);

        return this.addSeconds(number);

    }

    if (value.endsWith("menit")) {

        const number = parseInt(value);

        return this.addMinutes(number);

    }

    if (value.endsWith("jam")) {

        const number = parseInt(value);

        return this.addHours(number);

    }

    if (value.endsWith("hari")) {

        const number = parseInt(value);

        return this.addDays(number);

    }

    return null;

}



    
}



export default new TimeParser();