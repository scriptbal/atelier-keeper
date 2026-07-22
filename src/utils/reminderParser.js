export default function reminderParser(text){


    text =
    text.toLowerCase()
        .replace(/\s/g,"");


    if(text.endsWith("menit")){

        const value =
        parseInt(
            text.replace("menit","")
        );


        return value * 60;

    }



    if(text.endsWith("jam")){

        const value =
        parseInt(
            text.replace("jam","")
        );


        return value * 3600;

    }



    if(text.endsWith("hari")){

        const value =
        parseInt(
            text.replace("hari","")
        );


        return value * 86400;

    }



    if(text.endsWith("minggu")){

        const value =
        parseInt(
            text.replace("minggu","")
        );


        return value * 604800;

    }



    return 0;

}