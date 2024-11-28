import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/add-review" element={<ReviewForm />} />
          <Route path="/edit-review/:id" element={<ReviewForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
