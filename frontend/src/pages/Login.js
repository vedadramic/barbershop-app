import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            
            // Spremi token i korisničke podatke
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            alert('Uspješna prijava!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Greška pri prijavi');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Prijava</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn-primary">Prijavi se</button>
                </form>

                <p className="auth-link">
                    Nemate nalog? <Link to="/register">Registrujte se</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;