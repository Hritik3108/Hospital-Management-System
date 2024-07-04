const mongoose = require("mongoose");
const admissionSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Types.ObjectId,
    ref: "doctor",
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
    },
  ],
  bill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
  },
  admit_date: {
    type: Date,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reason_for_admit: {
    type: String,
  },
  bloodbags:{
    type: Number,
  }, 
  oxygen:{
    type: Number,
  }
},{ timestamps: true });

module.exports = mongoose.model("Admission", admissionSchema);
