const express = require('express');
const router = express.Router();
const {
  createTouristCard,
  getAllTouristCards,
  getTouristCardById,
  updateTouristCard,
  deleteTouristCard,
} = require('../controller/TouriestCardContoller');

// CRUD Routes
router.post('/add-card', createTouristCard);
router.get('/get-cards', getAllTouristCards);
router.get('/get-cards/:id', getTouristCardById);
router.put('/put-cards/:id', updateTouristCard);
router.delete('/delete-cards/:id', deleteTouristCard);

module.exports = router;
