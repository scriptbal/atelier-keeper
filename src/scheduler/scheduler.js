import notificationFactory from "../services/notificationFactory.js";
import scheduleRepository from "../repository/scheduleRepository.js";
import logger from "../utils/logger.js";


class Scheduler {


constructor(){

    this.interval = null;

    this.processing = new Set();

    this.running = false;

}


start(client){


    if(this.interval){

        return;

    }


    this.client = client;


    logger.info(
        "SCHEDULER",
        "Scheduler started."
    );


this.interval = setInterval(async ()=>{

    await this.check();

},1000);


}




async check(){

    if(this.running){
        return;
    }


    this.running = true;


    try {


        const schedules =
            scheduleRepository.getAll();


        
        /*
            Migration
        */

        for(const schedule of schedules){


            let changed = false;


            for(
                const notification of schedule.notifications
            ){


            if(!notification.sendAt){

                const scheduleTime =
                    schedule.event?.timestamp ??
                    new Date(schedule.event.datetime).getTime();


                if(isNaN(scheduleTime)){

                    console.error(
                        "INVALID DATETIME:",
                        schedule.event.datetime
                    );

                    continue;

                }


                notification.sendAt =
                    scheduleTime +
                    (
                        notification.offset * 1000
                    );


                changed = true;

            }


            }


            if(changed){

                scheduleRepository.update(
                    schedule.id,
                    schedule
                );

            }


        }



        const now = Date.now();

// Sinkronisasi status schedule
for (const schedule of schedules) {

    if (schedule.status !== "active") {
        continue;
    }

    const allSent = schedule.notifications.every(
        notification =>
            notification.status === "sent"
    );

    if (!allSent) {
        continue;
    }

    schedule.status = "completed";
    schedule.completedAt = Date.now();
    scheduleRepository.update(
        schedule.id,
        schedule
    );

    logger.info(
        "SCHEDULER",
        `${schedule.name} completed`
    );

}


        /*
            Scheduler check
        */


        for(const schedule of schedules){


            if(
                schedule.status !== "active"
            ){
                continue;
            }



            for(
                const notification of schedule.notifications
            ){



                if(
                    notification.status !== "pending"
                ){
                    continue;
                }



                const key =
                    schedule.id +
                    notification.label;



                console.log(
                    "[TIME CHECK]",
                    schedule.name,
                    notification.label,
                    notification.sendAt - now
                );



                if(
                    notification.sendAt <= now &&
                    !this.processing.has(key)
                ){


                    this.processing.add(key);



                    try {


                        await this.execute(
                            schedule,
                            notification
                        );


                    }
                    catch(error){

                        console.error(
                            "EXECUTE ERROR:",
                            error
                        );

                    }
                    finally {


                        this.processing.delete(key);


                    }



                    logger.info(

                        "SCHEDULER",

                        `Trigger ${notification.label} for ${schedule.name}`

                    );


                }


            }


        }



    }
    catch(error){

        console.error(
            "SCHEDULER ERROR:",
            error
        );

    }
    finally {


        this.running = false;


    }


}



async execute(
    schedule,
    notification
){

    notification.status = "sending";

    scheduleRepository.update(
        schedule.id,
        schedule
    );

    const success =
        await notificationFactory.send(
            this.client,
            schedule,
            notification
        );

    if(!success){

        notification.status = "pending";

        scheduleRepository.update(
            schedule.id,
            schedule
        );

        throw new Error(
            "Notification failed"
        );

    }

    notification.status = "sent";
    notification.sentAt = Date.now();

    const allSent =
        schedule.notifications.every(
            item =>
                item.status === "sent"
        );

        console.log(
    "NOTIFICATION STATUS:",
    schedule.notifications.map(n => ({
        label: n.label,
        status: n.status
    }))
);

if (allSent) {

    schedule.status = "completed";
    schedule.completedAt = Date.now();

    logger.info(
        "SCHEDULER",
        `${schedule.name} completed`
    );

}

    scheduleRepository.update(
        schedule.id,
        schedule
    );

}


}



export default new Scheduler();