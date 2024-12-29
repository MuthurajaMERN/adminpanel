const mongoose = require('mongoose');

const touristCardSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  stars: { type: Number, required: true, min: 0, max: 5 },
  price: { type: Number, required: true },
  discount: { type: Number }, // Fixed typo from `discount%` to `discount`
  county: { type: String }, // Fixed typo from `stirng` to `String`
  place: { type: String }, // Fixed typo from `stirng` to `String`
  content: { type: String },
  transport: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('TouristCard', touristCardSchema);
