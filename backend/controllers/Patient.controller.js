const Patient = require("../models/Patient.model");
const Admission = require("../models/Admission.model");

const getPatientDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const patient = await Patient.find({ _id: id }).select("-password").populate('appointments');

  res.status(200).json({ patient });
};

const getAdmittedPatients = async (req, res) => {
  const patients = await Admission.find({
    bill_id: { $exists: null },
  }).populate("patient_id");
  // console.log(patients);
  res.status(200).json({ patients });
};

const addTreatment = async (req, res) => {
  const { id } = req.params;
  const { treatment } = req.body;
  console.log(treatment);
  const admission = await Admission.findByIdAndUpdate(id, {
    $push: { treatments: treatment },
  });
  res.status(200).json({ admission });
};

const getAllPatientDetails = async (req, res) => {
  const patients = await Patient.find({}).select("-password").populate('appointments');;
  res.status(200).json({ patients });
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findByIdAndUpdate(id, req.body);
  res.status(200).json({ patient });
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findByIdAndDelete(id);
  if (!patient) {
    res.status(400).json({ error: "Patient not found" });
  } else {
    res.status(200).json({ patient });
  }
};

const addPatient = async (req, res) => {
  try {
    let patient;
    const { name,phone,address,sex,birthdate} = req.body;
    console.log('patient',req.body)
    if(req.file!=undefined){
      patient = await Patient.create({name,phone,address,sex,birthdate,profilePicture:req.file.filename});
    }else{
      patient = await Patient.create({name,phone,address,sex,birthdate});
    }
    res.status(201).json({ patient });
  } catch (e) {
    console.log(e);
    res.status(400).json({ e });
  }
};

const admitPatient = async (req, res) => {
  // console.log(req.body);
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({ admission });
  } catch (e) {
    console.log(e);
    res.status(400).json({ e });
  }
};

const getAdmissionInfo = async (req, res) => {
  const { id } = req.params;
  const admission = await Admission.find({ patient_id: id });
  res.status(201).json({ admission });
};

module.exports = {
  getPatientDetails,
  getAllPatientDetails,
  updatePatient,
  deletePatient,
  addPatient,
  admitPatient,
  getAdmissionInfo,
  addTreatment,
  getAdmittedPatients,
};
