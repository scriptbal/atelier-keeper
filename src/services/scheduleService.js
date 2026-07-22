import { randomUUID } from "crypto";

import {
    getTimestamp,
    calculateSendAt
} from "../utils/time.js";

import notificationModel from "../models/notificationModel.js";

import scheduleRepository from "../repository/scheduleRepository.js";



class ScheduleService {


create(data){


    const eventTimestamp =
        getTimestamp(
            data.datetime
        );



const notifications =
    data.notifications.map(item=>{


        const notification =
            notificationModel.create(
                item.label,
                item.offset
            );


        notification.sendAt =
            calculateSendAt(
                eventTimestamp,
                item.offset
            );


        return notification;


    });





    const schedule = {


        id:randomUUID(),


        name:data.name,


        message:data.message,



        event:{


            datetime:
                new Date(
                    eventTimestamp
                ).toISOString(),


            timestamp:
                eventTimestamp,


            timezone:
                data.timezone || 
                "Asia/Jakarta"

        },



        notifications,



        targets:
            data.targets || [],



        createdBy:
            data.createdBy,


        createdAt:
            Date.now(),



        status:"active"


    };



    scheduleRepository.save(schedule);



    return schedule;


}


}


export default new ScheduleService();