const express = require("express");
const router = express.Router();
const {  addAppointment, doctorGetAppointments, patientGetAppointments, getAppointments  } = require("../controllers/Appointment.controller");

router.get("/API/doctor/appointments/:id", doctorGetAppointments);
router.get("/API/patient/appointments/:id", patientGetAppointments);
router.post("/API/bookappointment/:doctorId", addAppointment);
router.get("/API/appointments", getAppointments);

module.exports = router;
