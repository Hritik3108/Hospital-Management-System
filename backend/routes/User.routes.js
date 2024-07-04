const router = require("express").Router();
const { Login, SignUp, updatePassword } = require("../controllers/User.controller");
const  upload  = require('../middleware/multer')

router.post("/API/login", Login);
router.put("/API/update/:id", updatePassword);
router.route("/API/signUp").post(upload.single('file'),SignUp);

module.exports = router;
