const express = require("express");
const router = express.Router();
const {
  getRooms,
  postRooms,
  updateRoom,
  getRoom,
  deleteRoom,
  getRoomDetails,
} = require("../controllers/Room.contoller");

router.get("/API/rooms", getRooms);
router.get("/API/details/:id", getRoomDetails);
router.get("/API/:id", getRoom);
router.delete("/API/:id", deleteRoom);
router.post("/API/addroom", postRooms);
router.patch("/API/:id", updateRoom);

module.exports = router;
