import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        rating: 5,
        comment: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchReviews();
        fetchAverageRating();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reviews');
            setReviews(response.data.data);
        } catch (error) {
            console.error('Greška pri učitavanju recenzija:', error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reviews/average');
            setAverageRating(response.data.data.average);
        } catch (error) {
            console.error('Greška pri učitavanju prosječne ocjene:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
            alert('Morate biti prijavljeni da ostavite recenziju');
            navigate('/login');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/reviews',
                { ...formData, user_id: user.id },
                { headers: { Authorization: 'Bearer ' + token } }
            );

            alert('Recenzija uspješno dodana!');
            setFormData({ rating: 5, comment: '' });
            setShowForm(false);
            fetchReviews();
            fetchAverageRating();
        } catch (error) {
            alert('Greška pri dodavanju recenzije');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? 'star filled' : 'star'}>
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRandomColor = (name) => {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="reviews-container">
            <div className="reviews-header">
                <h1>Recenzije Korisnika</h1>
                <div className="average-rating">
                    <div className="rating-number">{averageRating}</div>
                    <div className="rating-stars">{renderStars(Math.round(averageRating))}</div>
                    <p>Prosječna ocjena ({reviews.length} recenzija)</p>
                </div>
            </div>

            <button 
                className="btn-add-review" 
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Otkaži' : '+ Ostavi recenziju'}
            </button>

            {showForm && (
                <div className="review-form-container">
                    <h3>Ostavite svoju recenziju</h3>
                    <form onSubmit={handleSubmit} className="review-form">
                        <div className="form-group">
                            <label>Ocjena:</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= formData.rating ? 'star filled clickable' : 'star clickable'}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Komentar:</label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                rows="4"
                                required
                                placeholder="Podijelite svoje iskustvo..."
                            />
                        </div>

                        <button type="submit" className="btn-primary">Objavi recenziju</button>
                    </form>
                </div>
            )}

            <div className="reviews-list">
                <h2>Šta kažu naši korisnici</h2>
                {reviews.length === 0 ? (
                    <p className="no-reviews">Još nema recenzija. Budite prvi!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div 
                                    className="user-avatar" 
                                    style={{ backgroundColor: getRandomColor(review.user_name) }}
                                >
                                    {getInitials(review.user_name)}
                                </div>
                                <div className="review-info">
                                    <h4>{review.user_name}</h4>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="review-date">
                                        {new Date(review.created_at).toLocaleDateString('bs-BA', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Reviews;