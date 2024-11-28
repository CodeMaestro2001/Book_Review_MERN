const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// Routes
router.get('/', getReviews); // Get all reviews
router.post('/', createReview); // Create a new review
router.put('/:id', updateReview); // Update a review by ID
router.delete('/:id', deleteReview); // Delete a review by ID

module.exports = router;
