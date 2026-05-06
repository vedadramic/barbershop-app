const Review = require('../models/Review');

// CREATE REVIEW - POST
exports.createReview = async (req, res) => {
    try {
        const { user_id, rating, comment } = req.body;

        // Validacija
        if (!user_id || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Molimo unesite sva obavezna polja'
            });
        }

        // Provjera da li je rating između 1 i 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Ocjena mora biti između 1 i 5'
            });
        }

        const review = await Review.create({ user_id, rating, comment });

        res.status(201).json({
            success: true,
            message: 'Recenzija uspješno dodana',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri kreiranju recenzije',
            error: error.message
        });
    }
};

// GET ALL REVIEWS - GET
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        
        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri dohvatanju recenzija',
            error: error.message
        });
    }
};

// GET REVIEW BY ID - GET
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Recenzija nije pronađena'
            });
        }

        res.json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri dohvatanju recenzije',
            error: error.message
        });
    }
};

// GET REVIEWS BY USER - GET
exports.getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.findByUser(req.params.userId);
        
        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri dohvatanju recenzija',
            error: error.message
        });
    }
};

// UPDATE REVIEW - PUT
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        
        const updatedReview = await Review.update(req.params.id, { rating, comment });
        
        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: 'Recenzija nije pronađena'
            });
        }

        res.json({
            success: true,
            message: 'Recenzija uspješno ažurirana',
            data: updatedReview
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri ažuriranju recenzije',
            error: error.message
        });
    }
};

// DELETE REVIEW - DELETE
exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.delete(req.params.id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Recenzija nije pronađena'
            });
        }

        res.json({
            success: true,
            message: 'Recenzija uspješno obrisana'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri brisanju recenzije',
            error: error.message
        });
    }
};

// GET AVERAGE RATING - GET
exports.getAverageRating = async (req, res) => {
    try {
        const average = await Review.getAverageRating();
        
        res.json({
            success: true,
            data: { average: parseFloat(average).toFixed(1) }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri dohvatanju prosječne ocjene',
            error: error.message
        });
    }
};

// GET RATING STATS - GET
exports.getRatingStats = async (req, res) => {
    try {
        const stats = await Review.getRatingStats();
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Greška pri dohvatanju statistike',
            error: error.message
        });
    }
};