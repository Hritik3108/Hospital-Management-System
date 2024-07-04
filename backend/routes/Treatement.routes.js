const router = require("express").Router();
const { addTreatement } = require("../controllers/Treatement.contoller");

router.post("/", addTreatement);
// router.get("/:billId", getTreatements);
// router.post('/signUp', SignUp/);

module.exports = router;
