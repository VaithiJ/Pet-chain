import mongoose from "mongoose";
import  Schema  from "mongoose";

const SellPets = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    age:{
        type : String,
    },
    owner:{
        type : String,
        required : true,
    },
    mobile: {
        type: Number,
        required : true,
        default:1234567890
    },
    category:{
        type : String,
        required : true,
    },
    breed:{
        type : String,
        required : true,
    },
    gender:{
        type : String,
        required : true,
    },
    price:{
        type: String,
        default: 0,
    },
    location:{
        type: String,
        required : true,
    },
    isWishlisted:{
        type:String,
        default:"not wishlisted"
    },
    isAddedtocart:{
        type:String,
        default:"not added"
    },
    verifyStatus:{
        type: String,
        required : true,
        default: "not verified"
    },
    imageUploaded:{
        type: String,
        default: "not uploaded"
    },
    imageUrl:{
        type:[String],
        default:[]
    },
    submittedForVerification:{
        type:String,
        default:"not submitted"
    },
    latitude:{
        type:String,
        default:"13.1067448"

    },
    longitude:{
        type:String,
        default:"80.0969511"
    },
    city:{
        type:String,
        default:"Avadi",
        required: true
    },
    state:{
        type: String,
        required: true,
        default:"Tamil Nadu"
    },
    country:{
        type:String,
        required: true,
        default:"India"
    },
    pincode:{
        type: Number,
        required: true,
        default:600054
    }



    

},{timestamps:true})


export default mongoose.model("Sell", SellPets)