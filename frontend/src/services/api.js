import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/reviews' });

export const fetchReviews = () => API.get('/');
export const createReview = (review) => API.post('/', review);
export const updateReview = (id, updatedReview) => API.put(`/${id}`, updatedReview);
export const deleteReview = (id) => API.delete(`/${id}`);
