export class Schedule {

    constructor(data){

        this.id = data.id;

        this.name = data.name;

        this.message = data.message;


        this.event = {

            datetime:data.event.datetime,

            timestamp:data.event.timestamp,

            timezone:data.event.timezone

        };


        this.notifications =
            data.notifications || [];


        this.targets =
            data.targets || [];


        this.createdBy =
            data.createdBy;


        this.createdAt =
            data.createdAt;


        this.status =
            data.status || "active";

    }


}