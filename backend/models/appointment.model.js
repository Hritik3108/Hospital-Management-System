const mongoose = require("mongoose");
const {Schema} = mongoose
const {ObjectId} = Schema.Types

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required:true
  },
  patient: {
    type: ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: ObjectId,
    ref: "doctor",
  }

 
},{ timestamps: true });

module.exports = mongoose.model("appointment", appointmentSchema);
