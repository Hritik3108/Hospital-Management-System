const express = require("express");
const router = express.Router();

const {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  addPatient,
  admitPatient,
  getAdmissionInfo,
  addTreatment,
  getAdmittedPatients,
} = require("../controllers/Patient.controller");
const {isAuthenticatedUser,authorizeAdminRole} = require('../middleware/auth')
const { getBillByPatient } = require('../controllers/Bill.controller');

router.get("/API/admitted",isAuthenticatedUser, getAdmittedPatients);
router.get("/API/patient/:id",isAuthenticatedUser, getPatientDetails);
router.put("/API/patient/:id",isAuthenticatedUser, updatePatient);
router.delete("/API/:id",isAuthenticatedUser, deletePatient);
router.post("/API/admit",isAuthenticatedUser, admitPatient);

router.patch("/API/admit/:id",isAuthenticatedUser, addTreatment);
router.get("/API/admit/:id",isAuthenticatedUser, getAdmissionInfo);
router.get("/API/bill/:id",isAuthenticatedUser, getBillByPatient);
module.exports = router;