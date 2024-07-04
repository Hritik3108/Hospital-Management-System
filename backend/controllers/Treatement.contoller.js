const Treatement = require("../models/Treatments.model");

const addTreatement = async (req, res) => {
  const treatment = await Treatement.create(req.body);
  res.status(200).json({ treatment });
};

module.exports = {
  addTreatement,
};
