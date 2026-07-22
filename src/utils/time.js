class TimeUtil {

    constructor() {

        this.locale = "id-ID";

        this.timezone = "Asia/Jakarta";

    }

    now() {

        return new Date();

    }

    formatDate(date) {

        return date.toLocaleDateString(

            this.locale,

            {

                weekday: "long",

                year: "numeric",

                month: "long",

                day: "numeric",

                timeZone: this.timezone

            }

        );

    }

    formatTime(date) {

        return date.toLocaleTimeString(

            this.locale,

            {

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false,

                timeZone: this.timezone

            }

        );

    }

    formatDateTime(date) {

        return `${

            this.formatDate(date)

        } ${

            this.formatTime(date)

        }`;

    }

    isPast(date) {

        return date.getTime() < Date.now();

    }

    

}

export default new TimeUtil();

export function getTimestamp(date){

    return new Date(date).getTime();

}



export function calculateSendAt(
    eventTimestamp,
    offset
){

    return eventTimestamp + 
        (offset * 1000);

}