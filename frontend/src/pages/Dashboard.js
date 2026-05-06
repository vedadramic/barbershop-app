import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import './Dashboard.css';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));
        fetchAppointments(JSON.parse(userData).id);
        fetchServices();
    }, [navigate]);

    const fetchAppointments = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5000/api/appointments/user/${userId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAppointments(response.data.data);
        } catch (error) {
            console.error('Greška pri učitavanju termina:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            setServices(response.data.data);
        } catch (error) {
            console.error('Greška pri učitavanju usluga:', error);
        }
    };

    const handleDeleteAppointment = async (id) => {
        if (!window.confirm('Da li ste sigurni da želite otkazati termin?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Termin uspješno otkazan');
            fetchAppointments(user.id);
        } catch (error) {
            alert('Greška pri brisanju termina');
        }
    };

    const handleEditAppointment = (appointment) => {
        setEditingAppointment(appointment);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateAppointment = async (appointmentData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/appointments/${editingAppointment.id}`,
                appointmentData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Termin uspješno ažuriran!');
            setEditingAppointment(null);
            fetchAppointments(user.id);
        } catch (error) {
            alert('Greška pri ažuriranju termina');
        }
    };

    const handleCancelEdit = () => {
        setEditingAppointment(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return <div>Učitavanje...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dobrodošli, {user.name}!</h1>
                <button onClick={handleLogout} className="btn-logout">Odjavi se</button>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <h2>{editingAppointment ? 'Uredi termin' : 'Zakaži novi termin'}</h2>
                    {editingAppointment && (
                        <div className="edit-notification">
                            <p>Uređujete termin za: <strong>{editingAppointment.service_name}</strong></p>
                            <button onClick={handleCancelEdit} className="btn-cancel-edit">Otkaži izmjene</button>
                        </div>
                    )}
                    <AppointmentForm 
                        services={services} 
                        userId={user.id}
                        onSuccess={() => {
                            fetchAppointments(user.id);
                            setEditingAppointment(null);
                        }}
                        editingAppointment={editingAppointment}
                        onUpdate={handleUpdateAppointment}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>

                <div className="dashboard-section">
                    <h2>Moji Termini</h2>
                    {appointments.length === 0 ? (
                        <p>Nemate zakazanih termina</p>
                    ) : (
                        <div className="appointments-list">
                            {appointments.map(appointment => (
                                <div key={appointment.id} className="appointment-card">
                                    <h3>{appointment.service_name}</h3>
                                    <p><strong>Datum:</strong> {new Date(appointment.appointment_date).toLocaleDateString('bs-BA')}</p>
                                    <p><strong>Vrijeme:</strong> {appointment.appointment_time}</p>
                                    <p><strong>Cijena:</strong> {appointment.service_price} KM</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`status status-${appointment.status}`}>
                                            {appointment.status === 'pending' ? 'Na čekanju' : 
                                             appointment.status === 'confirmed' ? 'Potvrđen' : 'Otkazan'}
                                        </span>
                                    </p>
                                    {appointment.notes && <p><strong>Napomena:</strong> {appointment.notes}</p>}
                                    <div className="appointment-actions">
                                        <button 
                                            onClick={() => handleEditAppointment(appointment)}
                                            className="btn-edit"
                                        >
                                            Uredi
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                            className="btn-delete"
                                        >
                                            Otkaži termin
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;