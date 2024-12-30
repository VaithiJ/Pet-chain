import mongoose from "mongoose";
import  Schema  from "mongoose";

const AdoptionForm = new mongoose.Schema({

    name:{
        type : String,
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
    address:{
        type: String,
        required : true,
    },
    addInfo:{
        type: String,
        default:"Nil"
    },
    owner:{
        type:String,
    }

},{timestamps:true})


export default mongoose.model("Adoption", AdoptionForm)