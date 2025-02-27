const mongoose = require("mongoose");
const {Schema} = mongoose
const {ObjectId} = Schema.Types
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  profilePicture: {
    type: String,
  },
  phone: {
    type: String,
    unique: [true, "Phone already exists"],
  },
  department: {
    type: String,
  },
  fee: {
    type: Number,
  },
  appointments:[{
    type: ObjectId,
    ref: "appointment",
  }]
});
doctorSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
doctorSchema.methods.checkPassword = async function (password) {
  // console.log(password);
  const isMatch = await bycrypt.compare(password, this.password);
  return isMatch;
};
doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "doctor", name: this.name },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};
module.exports = mongoose.model("doctor", doctorSchema);
