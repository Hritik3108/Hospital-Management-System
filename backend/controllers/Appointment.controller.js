const Doctor = require('../models/Doctor.model');
const { StatusCodes } = require('http-status-codes');
const appointmentModel = require('../models/appointment.model')
const patientModel = require('../models/Patient.model')

const doctorGetAppointments = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  const appointments = doctor.appointments;
  res.status(StatusCodes.OK).json({ appointments });
};

const patientGetAppointments = async (req, res) => {
  const { id } = req.params;
  const patient = await patient.findById(id);
  const appointments = patient.appointments;
  res.status(StatusCodes.OK).json({ appointments });
};

const addAppointment = async (req, res) => {
  const { doctorId } = req.params;
  const {patientId,date} = req.body;
  console.log('addAppointment',date,patientId,doctorId);
  const doctor = await Doctor.findById(doctorId);
  const patient = await patientModel.findById(patientId);

  const newAppointment = await appointmentModel.create({date,patientId,doctorId}); 
  
  doctor.appointments.push(newAppointment);
  doctor.save();

  patient.appointments.push(newAppointment);
  patient.save();

  res.status(StatusCodes.CREATED).json({ newAppointment });
};

const getAppointments = async (req,res) => {
  const appointments = appointmentModel.find();
  if(!appointments){
    res.status(400).send({message:'no appointments'})
  }else{
    res.status(200).send(appointments);
  }
}

// const updateAppointment = async (req, res) => {
//   const { id } = req.params;
//   const user = req.user;
//   const doctor = await Doctor.findById(user._id);
//   const index = doctor.appointments.findIndex(
//     (appointment) => appointment._id == id
//   );
//   if (index == -1) {
//     res
//       .status(StatusCodes.NOT_FOUND)
//       .json({ message: 'Appointment not found' });
//   } else {
//     doctor.appointments[index] = req.body;
//     doctor.save();
//     res.status(StatusCodes.OK).json({ doctor });
//   }
// };

module.exports = {
  patientGetAppointments,
  addAppointment,
  doctorGetAppointments,
  getAppointments,
  // updateAppointment,
};
