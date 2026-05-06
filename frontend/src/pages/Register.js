import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert('Uspješna registracija! Sada se možete prijaviti.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Greška pri registraciji');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Registracija</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Ime i prezime:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Lozinka:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefon:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary">Registruj se</button>
                </form>

                <p className="auth-link">
                    Već imate nalog? <Link to="/login">Prijavite se</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;