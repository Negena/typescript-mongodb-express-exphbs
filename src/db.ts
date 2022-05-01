import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config();

async function connect(){
  try{
    await mongoose.connect(process.env.DB_CONNECT as string, (err) => {
      if (err) throw err;
      console.log("connected to db")
    })

  }catch(e){
    console.log(e)
  }
}

export default connect
