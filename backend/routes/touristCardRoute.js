const express = require("express");
const router = express.Router();
const {
  addCard,
  getAllCards,
  updateCard,
  deleteCard,
} = require("../controller/TouriestCardContoller");

router.post("/add", addCard);
router.get("/get_all", getAllCards);
router.put("/update/:id", updateCard);
router.delete("/delete/:id", deleteCard);

module.exports = router;
