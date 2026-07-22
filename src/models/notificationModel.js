import crypto from "crypto";


class NotificationModel {


    create(label, offset) {


        return {

            id: crypto.randomUUID(),

            label,

            offset,

            sendAt: null,

            status: "pending",

            sentAt: null

        };


    }


}


export default new NotificationModel();