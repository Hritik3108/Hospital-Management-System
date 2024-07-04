const Admin = require("../models/admin.model");
const Doctor = require("../models/Doctor.model");
const receptionist = require('../models/receptionist.model')
const userModel = require('../models/user.model')

const Login = async (req, res) => {
  var { email, password, role } = req.body;
  console.log(req.body)
  
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Please enter email and password" });
  }

  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role === "doctor") {
    currModel = Doctor;
    // console.log('doctor login')
  } else {
    currModel = receptionist;
  }
  
  const user = await currModel.findOne({ email: email });
  if (!user) {
    res.status(400).json({ error: "User not found" });
  }

  const isCorrect = await user.checkPassword(password);

  if (isCorrect) {
    const token = user.generateAuthToken();
    user.password=undefined;
    res.status(200).json({ user,token,role:role });
  } else {
    res.status(401).json({ error: "Incorrect password" });
  }
};

const SignUp = async (req, res) => {
  console.log('signup',req.body)
  const { email,name,phone,password,address,sex,role } = req.body;

  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role === "doctor") {
    currModel = Doctor;
  } else {
    currModel = receptionist;
  }
  
  let savedUser;
  if(req.file!=undefined){
    // currModel.profilePicture=req.file.filename;
    savedUser = await currModel.create({email,name,phone,password,address,sex,profilePicture:req.file.filename,role});
  }else{
    savedUser = await currModel.create({email,name,phone,password,address,sex,role});
  }
  
  if (savedUser) {
    const token = savedUser.generateAuthToken();
    savedUser.password=undefined;
    res.status(200).json({ user:savedUser,token });
  } else {
    res.status(400).json({ error: "User not saved" });
  }
};

const updatePassword = async (req, res) => {
  
  const { role } = req.body;
  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role === "doctor") {
    currModel = Doctor;
  } else {
    currModel = receptionist;
  }
  
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const user = await currModel.findById(id);
  const isCorrect = await user.checkPassword(oldPassword);
  if (isCorrect) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ user });
  } else {
    res.status(400).json({ error: "Incorrect password" });
  }
};

module.exports = { Login, SignUp, updatePassword };