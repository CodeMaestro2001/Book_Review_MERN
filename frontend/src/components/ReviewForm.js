import React, { useState, useEffect } from 'react';
import { createReview, updateReview, fetchReviews } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ReviewForm = () => {
  const [review, setReview] = useState({
    title: '',
    author: '',
    rating: 0,
    reviewText: '',
  });
  const [ratingPercentage, setRatingPercentage] = useState(0); // Store the percentage
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getReview = async () => {
        const { data } = await fetchReviews();
        const existingReview = data.find((review) => review._id === id);
        if (existingReview) {
          setReview(existingReview);
          setRatingPercentage((existingReview.rating / 5) * 100); // Set initial percentage
        }
      };
      getReview();
    }
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setReview({ ...review, rating: newRating });
    setRatingPercentage((newRating / 5) * 100); // Calculate percentage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateReview(id, review);
    } else {
      await createReview(review);
    }
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-center">{id ? 'Edit Review' : 'Add Your Review'}</h2>
          <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter the book title"
                value={review.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                name="author"
                placeholder="Enter the author's name"
                value={review.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <ReactStars
                count={5}
                value={review.rating}
                size={30}
                activeColor="#ffd700"
                isHalf={true}
                onChange={handleRatingChange}
              />
              <p className="text-muted">Rating Percentage: {ratingPercentage.toFixed(2)}%</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Review</label>
              <textarea
                className="form-control"
                name="reviewText"
                rows="4"
                placeholder="Write your detailed review here..."
                value={review.reviewText}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
