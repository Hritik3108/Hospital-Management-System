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

const  upload  = require('../middleware/multer')

router.get("/API/patients", getAllPatientDetails);
router.route("/API/addPatient").post(upload.single('file'),addPatient);

router.get("/API/admitted", isAuthenticatedUser,getAdmittedPatients);
router.get("/API/patient/get/:id", isAuthenticatedUser,getPatientDetails);
router.put("/API/patient/update/:id",isAuthenticatedUser, updatePatient);
router.delete("/API/patient/delete/:id",isAuthenticatedUser, deletePatient);
router.post("/API/admit",isAuthenticatedUser, admitPatient);

router.patch("/API/admit/:id",isAuthenticatedUser, addTreatment);
router.get("/API/admit/:id",isAuthenticatedUser, getAdmissionInfo);
router.get("/API/bill/:id",isAuthenticatedUser, getBillByPatient);

module.exports = router;