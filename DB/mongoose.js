import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function ConnectToDB(){
    try{
        mongoose.connect(process.env.DB_URL).then(
            ()=>{
                console.log("connected to db successully");
            }
        ).catch((e)=>{
               console.log(`error to connect :${e}`);
        })
           
    }catch(error){
       console.log(`error:${error}`);
    }
}
