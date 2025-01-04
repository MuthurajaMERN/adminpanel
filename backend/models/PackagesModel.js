const mongoose = require('mongoose');

const packagesCardSchema = new mongoose.Schema({
  image: { type: String,},
  title: { type: String,},
  subtitle: { type: String },
  category: { type: String,},
  subCategory: { type: String, },
  stars: { type: Number,  min: 0, max: 5 },
  price: { type: Number,  },
  discount: { type: Number }, // Fixed typo from `discount%` to `discount`
  county: { type: String }, // Fixed typo from `stirng` to `String`
  place: { type: String }, // Fixed typo from `stirng` to `String`
  content: { type: String },
  transport: { type: String,},
}, { timestamps: true });

module.exports = mongoose.model('PackagesCard', packagesCardSchema);
