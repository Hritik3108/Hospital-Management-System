const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config({path:'./process.env'});

const app = express()

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use(express.static('images'))

app.listen(5100,()=>{
    console.log('server started')
})

mongoose.connect(process.env.DATABASE);

const db=mongoose.connection;
db.on('open',()=>{
    console.log('Connection to database successful');
});
db.on('error',()=>{
    console.log('Connection with database failed');
});

const userRoute = require('./routes/User.routes') 
app.use(userRoute)

const receptionRoute = require('./routes/receptionist.routes') 
app.use(receptionRoute)

const patientRoute = require('./routes/Patient.routes') 
app.use(patientRoute)

const doctorRoute = require('./routes/Doctor.routes') 
app.use(doctorRoute)

const roomRoute = require('./routes/Room.routes') 
app.use(roomRoute)

const appointmentRoute = require('./routes/appointment.routes') 
app.use(appointmentRoute)