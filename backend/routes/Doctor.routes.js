const express = require("express");
const router = express.Router();

const {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
  getPatients,
  getPrevPatients,
} = require("../controllers/Doctor.controller");

const {isAuthenticatedUser,authorizeAdminRole} = require('../middleware/auth')


router.get("/API/doctors", isAuthenticatedUser,getDoctors);
// router.post("/adddoctor", postDoctors);
router.get("/API/doctor/:id",isAuthenticatedUser, getDoctor);
router.get("/API/doctor/patients/:id",isAuthenticatedUser, getPatients);
router.get("/API/doctor/previousPatients/:id",isAuthenticatedUser, getPrevPatients);
router.patch("/API/doctor/edit/:id",isAuthenticatedUser,authorizeAdminRole, editDoctor);
router.delete("/API/doctor/delete/:id",isAuthenticatedUser,authorizeAdminRole, deleteDoctor);

module.exports = router;
