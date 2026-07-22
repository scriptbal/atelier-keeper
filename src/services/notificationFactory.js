import notificationModel from "../models/notificationModel.js";

class NotificationFactory {

    createDefault() {

        return [

            notificationModel.create(

                "Hari H",

                0

            )

        ];

    }

    createEvent() {

        return [

            notificationModel.create(

                "H-7",

                -604800

            ),

            notificationModel.create(

                "H-1",

                -86400

            ),

            notificationModel.create(

                "1 Jam Sebelum",

                -3600

            ),

            notificationModel.create(

                "Hari H",

                0

            )

        ];

    }



  async send(
    client,
    schedule,
    notification
){


console.log(
    "DATETIME CHECK:",
    JSON.stringify(schedule.event.datetime),
    typeof schedule.event.datetime
);

if(
    notification.status === "sent"
){
    return;
}

const formattedDate =
    this.formatDate(
        schedule.event.datetime
    );

const message =

    `🔔 Reminder\n\n`+

    `**${schedule.name}**\n`+

    `${schedule.message}\n\n`+

    formattedDate;





    for(
        const target of schedule.targets
    ){



        // =====================
        // DM USER
        // =====================

        if(
            target.type === "dm"
        ){

            try {


                const user =
                    await client.users.fetch(
                        target.userId
                    );


                await user.send({

                    content:message

                });



            }
            catch(error){

                console.error(
                    "DM ERROR:",
                    error.message
                );

            }


        }




        // =====================
        // DISCORD CHANNEL
        // =====================

        if(
            target.type === "channel"
        ){

            try {


                const channel =
                    await client.channels.fetch(
                        target.channelId
                    );


                if(channel){


                    await channel.send({

                        content:message

                    });


                }



            }
            catch(error){

                console.error(
                    "CHANNEL ERROR:",
                    error.message
                );

            }

        }


        
    }
    return true;


}



createTest(){

return [
    notificationModel.create(
        "10 Detik Sebelum",
        -10
    ),

    notificationModel.create(
        "Hari H",
        0
    )
];

}



formatDate(datetime){


    if(!datetime){

        return "Tanggal tidak tersedia";

    }


    datetime = String(datetime).trim();



    // coba format normal ISO

    const normal =
        new Date(datetime);



    if(!isNaN(normal.getTime())){


        return normal.toLocaleString(
            "id-ID",
            {
                timeZone:"Asia/Jakarta"
            }
        );

    }





    // handle DD-MM-YYYY HH:mm

    const parts =
        datetime.split(" ");



    if(parts.length !== 2){

        return "Invalid Date";

    }



    const [
        day,
        month,
        year
    ] =
    parts[0].split("-");



    const time =
        parts[1];



    const fixed =
        new Date(
            `${year}-${month}-${day}T${time}:00+07:00`
        );



    if(isNaN(fixed.getTime())){

        return "Invalid Date";

    }



    return fixed.toLocaleString(
        "id-ID",
        {
            timeZone:"Asia/Jakarta"
        }
    );


}

}




export default new NotificationFactory();

