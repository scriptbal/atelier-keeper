import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default async function loadEvents(client) {


    const eventsPath = path.join(
        __dirname,
        "..",
        "events"
    );


    const files = fs
        .readdirSync(eventsPath)
        .filter(
            file => file.endsWith(".js")
        );


    let totalEvents = 0;


    for (const file of files) {


        const { default: event } =
            await import(
                `../events/${file}`
            );


        console.log(
            "Loading event:",
            event.name
        );


        if(event.once){


            client.once(
                event.name,
                (...args)=>{

                    console.log(
                        "EVENT:",
                        event.name,
                        args[0]?.constructor?.name
                    );


                    event.execute(
                        ...args
                    );

                }
            );


        } else {


            client.on(
                event.name,
                (...args)=>{


                    console.log(
                        "EVENT:",
                        event.name,
                        args[0]?.constructor?.name
                    );


                    event.execute(
                        ...args
                    );


                }
            );


        }


        totalEvents++;


    }


    return totalEvents;


}