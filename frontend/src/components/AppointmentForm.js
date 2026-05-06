import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentForm.css';

function AppointmentForm({ services, userId, onSuccess, editingAppointment, onUpdate, onCancelEdit }) {
    const [formData, setFormData] = useState({
        service_id: '',
        appointment_date: '',
        appointment_time: '',
        notes: ''
    });

    useEffect(() => {
        if (editingAppointment) {
            // Formatiranje datuma da bude u lokalnom vremenu
            const dateObj = new Date(editingAppointment.appointment_date);
            const localDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
            const formattedDate = localDate.toISOString().split('T')[0];

            setFormData({
                service_id: editingAppointment.service_id,
                appointment_date: formattedDate,
                appointment_time: editingAppointment.appointment_time.substring(0, 5), // HH:MM format
                notes: editingAppointment.notes || ''
            });
        } else {
            setFormData({
                service_id: '',
                appointment_date: '',
                appointment_time: '',
                notes: ''
            });
        }
    }, [editingAppointment]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingAppointment) {
            // Azuriranje postojeceg termina
            onUpdate({
            service_id: formData.service_id,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            status: editingAppointment.status,
            notes: formData.notes
            });
        } else {
            // Kreiranje novog termina
            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    'http://localhost:5000/api/appointments',
                    { ...formData, user_id: userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                alert('Termin uspješno zakazan!');
                setFormData({
                    service_id: '',
                    appointment_date: '',
                    appointment_time: '',
                    notes: ''
                });
                onSuccess();
            } catch (error) {
                alert('Greška pri zakazivanju termina');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
                <label>Usluga:</label>
                <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Izaberite uslugu</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name} - {service.price} KM
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Datum:</label>
                <input
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                />
            </div>

            <div className="form-group">
                <label>Vrijeme:</label>
                <input
                    type="time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Napomena:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Dodajte napomenu (opcionalno)"
                />
            </div>

            <button type="submit" className="btn-primary">
                {editingAppointment ? 'Sačuvaj izmjene' : 'Zakaži termin'}
            </button>
        </form>
    );
}

export default AppointmentForm;