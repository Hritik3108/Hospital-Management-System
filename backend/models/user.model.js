const mongoose = require('mongoose')

const {Schema} = mongoose
const {ObjectId} = Schema.Types

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    profilePicture: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    sex: {
        type: String,
    },
    department: {
        type: String,
    },
    fee: {
        type: Number,
    },
    role:{
        type: String,
        default:"Receptionist",
    },
},{ timestamps: true })

const userModel = mongoose.model("HospitalUser",userSchema); 
module.exports = userModel;