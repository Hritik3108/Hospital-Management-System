const Doctor = require("../models/Doctor.model");
const Patient = require("../models/Patient.model");
const Admission = require("../models/Admission.model");
const { StatusCodes } = require("http-status-codes");

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find().select("-password").populate('appointments');
  if(!doctors){
    // console.log('doc not found')
    res.status(404).json({ message:'not found' });
  }else{
    // console.log('doc found',doctors)

    res.status(StatusCodes.OK).json({ doctors });
  }
};

const getPrevPatients = async (req, res) => {
  const patients = await Admission.find({ doctor_id: req.params.id }).populate(
    "patient_id"
  );
  res.status(StatusCodes.OK).json({ patients });
};

const getPatients = async (req, res) => {
  const patients = await Admission.find({
    doctor_id: req.params.id,
    bill_id: { $exists: null },
  }).populate("patient_id");
  // console.log(admission);
  // const patients = await Patient.find({ doctor: req.params.id });
  res.status(StatusCodes.OK).json({ patients });
};

const postDoctors = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(StatusCodes.CREATED).json({ doctor });
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ doctor });
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).select("-password");
  res.status(StatusCodes.OK).json({ doctor });
};

const editDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ doctor });
};

module.exports = {
  getDoctors,
  postDoctors,
  deleteDoctor,
  getDoctor,
  editDoctor,
  getPatients,
  getPrevPatients,
};
