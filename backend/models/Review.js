const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  title: { type: String, required: true }, 
  author: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }, 
  reviewText: { type: String, required: true }, 
  dateAdded: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Review', reviewSchema);
