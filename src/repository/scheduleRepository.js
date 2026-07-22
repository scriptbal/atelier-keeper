import fs from "fs";


const file =
"./data/schedules.json";



class ScheduleRepository {


getAll(){

    if(!fs.existsSync(file))
        return [];


    return JSON.parse(
        fs.readFileSync(file)
    );

}



save(data){

    const schedules =
        this.getAll();


    schedules.push(data);



    fs.writeFileSync(
        file,
        JSON.stringify(
            schedules,
            null,
            4
        )
    );


}


saveAll(data){

    fs.writeFileSync(

        file,

        JSON.stringify(
            data,
            null,
            4
        )

    );

}



update(id,data){


    const schedules =
        this.getAll();



    const index =
        schedules.findIndex(
            x=>x.id===id
        );



    if(index===-1)
        return false;



schedules[index]={
    ...schedules[index],
    ...data
};



    fs.writeFileSync(
        file,
        JSON.stringify(
            schedules,
            null,
            4
        )
    );


    return true;


}


getById(id){

    const schedules = this.getAll();


    return schedules.find(
        schedule => schedule.id === id
    );

}







findById(id){

    const schedules = this.getAll();


    return schedules.find(

        schedule => schedule.id === id

    );

}




delete(id){

    const schedules = this.getAll();


    const index = schedules.findIndex(
        schedule => schedule.id === id
    );


    if(index === -1){

        return false;

    }


    schedules.splice(index,1);


    fs.writeFileSync(

        "data/schedules.json",

        JSON.stringify(
            schedules,
            null,
            4
        )

    );


    return true;

}






}




export default new ScheduleRepository();