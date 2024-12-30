import mongoose from "mongoose";
import  Schema  from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    
    password:{
        type: String,
         required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true,
    },
    mobile:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required : true,
    },
    role:{
        type: String,
        required: true
        
    }

},{timestamps:true})


export default mongoose.model("Users", UserSchema)