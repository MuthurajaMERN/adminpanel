const express = require('express');
const router = express.Router();
const {
  createTouristCard,
  getAllTouristCards,
  getTouristCardById,
  updateTouristCard,
  deleteTouristCard,
} = require('../controller/TouristCardContoller');

// CRUD Routes
router.post('/add-card', upload.single('image'), createTouristCard);
router.get('/get-cards', getAllTouristCards);
router.get('/get-cards/:id', getTouristCardById);
router.put('/put-cards/:id', upload.single('image'), updateTouristCard);
router.delete('/delete-cards/:id', deleteTouristCard);


module.exports = router;
