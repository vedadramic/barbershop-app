const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/average', reviewController.getAverageRating);
router.get('/stats', reviewController.getRatingStats);
router.get('/:id', reviewController.getReviewById);

// Protected routes
router.post('/', authMiddleware, reviewController.createReview);
router.get('/user/:userId', authMiddleware, reviewController.getReviewsByUser);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;