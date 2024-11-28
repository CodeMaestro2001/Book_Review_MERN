import React, { useEffect, useState } from 'react';
import { fetchReviews, deleteReview } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await fetchReviews();
      setReviews(data);
      setFilteredReviews(data);
    };
    getReviews();
  }, []);

  const handleDelete = async (id) => {
    await deleteReview(id);
    const updatedReviews = reviews.filter((review) => review._id !== id);
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`);
  };

  const calculatePercentage = (rating) => {
    return (rating / 5) * 100;
  };

  const handleFilterRating = (rating) => {
    setFilterRating(rating);
    if (rating === 0) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.rating === rating);
      setFilteredReviews(filtered);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedReviews = [...filteredReviews].sort((a, b) => {
      if (option === 'newest') {
        return new Date(b.dateAdded) - new Date(a.dateAdded); // Newest first
      } else if (option === 'oldest') {
        return new Date(a.dateAdded) - new Date(b.dateAdded); // Oldest first
      } else if (option === 'rating') {
        return b.rating - a.rating; // Highest rating first
      }
      return 0; // Default return value
    });
    setFilteredReviews(sortedReviews);
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Book Reviews</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate('/add-review')}>
          Add Your Review
        </button>
        <div className="d-flex align-items-center">
          <label className="me-2">Filter by Rating:</label>
          <select
            className="form-select w-auto me-3"
            value={filterRating}
            onChange={(e) => handleFilterRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <label className="me-2">Sort by:</label>
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating First</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredReviews.map((review) => (
          <div className="col-md-4 mb-4" key={review._id}>
            <div className="card review-card shadow-lg h-100">
              <div className="card-body">
                <h5 className="card-title">{review.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{review.author}</h6>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className="text-muted mb-1">
                  Rating Percentage: {calculatePercentage(review.rating).toFixed(2)}%
                </p>
                <p className="card-text mb-3">{review.reviewText}</p>
                <p className="text-muted">
                  <small>Added on: {new Date(review.dateAdded).toLocaleString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(review._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
