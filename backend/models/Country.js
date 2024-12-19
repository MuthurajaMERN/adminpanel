const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: { 
    type: Number, 
    required: [true, 'Price is required'], 
    min: [0, 'Price must be greater than or equal to 0'] 
  },
  mainImage: { type: String, required: [true, 'Main image URL is required'] },
  otherImages: [{ type: String }], // List of additional images
}, { timestamps: true });

module.exports = mongoose.model('Country', countrySchema);
