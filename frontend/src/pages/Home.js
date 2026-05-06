import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

function Home() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            setServices(response.data.data);
        } catch (error) {
            console.error('Greska pri ucitavanju usluga:', error);
        }
    };

    const handleReserveClick = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>Dobrodošli u Alen's Barbershop</h1>
                    <p>Profesionalne usluge šišanja i brijanja u srcu grada</p>
                    <button onClick={handleReserveClick} className="btn-hero">
                        Rezerviši termin
                    </button>
                </div>
            </section>

            <section className="services-section">
                <h2>Naše Usluge</h2>
                <div className="services-grid">
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </section>

            <section className="about-section">
                <h2>O Nama</h2>
                <p>
                    Alen's Barbershop pruža vrhunske usluge muškog šišanja i brijanja već godinama.
                    Naš tim profesionalnih brica garantuje najkvalitetniju uslugu i prijatno iskustvo.
                </p>
            </section>
        </div>
    );
}

export default Home;