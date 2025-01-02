const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createTouristCard,
  getAllTouristCards,
  getTouristCardById,
  updateTouristCard,
  deleteTouristCard,
} = require('../controller/TouristCardContoller');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
});

// CRUD Routes
router.post('/add-card', upload.single('image'), createTouristCard);
router.get('/get-cards', getAllTouristCards);
router.get('/get-cards/:id', getTouristCardById);
router.put('/put-cards/:id', upload.single('image'), updateTouristCard);
router.delete('/delete-cards/:id', deleteTouristCard);

module.exports = router;
