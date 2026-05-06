const db = require('../config/database');

class Appointment {
    // CREATE
    static async create(appointmentData) {
        try {
            const { user_id, service_id, appointment_date, appointment_time, notes } = appointmentData;
            
            const [result] = await db.query(
                'INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time, notes) VALUES (?, ?, ?, ?, ?)',
                [user_id, service_id, appointment_date, appointment_time, notes]
            );
            
            return { id: result.insertId, ...appointmentData, status: 'pending' };
        } catch (error) {
            throw error;
        }
    }

    // READ ALL
    static async findAll() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    a.*,
                    u.name as user_name,
                    u.email as user_email,
                    u.phone as user_phone,
                    s.name as service_name,
                    s.price as service_price,
                    s.duration as service_duration
                FROM appointments a
                JOIN users u ON a.user_id = u.id
                JOIN services s ON a.service_id = s.id
                ORDER BY a.appointment_date DESC, a.appointment_time DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // READ BY ID
    static async findById(id) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    a.*,
                    u.name as user_name,
                    u.email as user_email,
                    u.phone as user_phone,
                    s.name as service_name,
                    s.price as service_price,
                    s.duration as service_duration
                FROM appointments a
                JOIN users u ON a.user_id = u.id
                JOIN services s ON a.service_id = s.id
                WHERE a.id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // READ BY USER
    static async findByUser(userId) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    a.*,
                    s.name as service_name,
                    s.price as service_price,
                    s.duration as service_duration
                FROM appointments a
                JOIN services s ON a.service_id = s.id
                WHERE a.user_id = ?
                ORDER BY a.appointment_date DESC, a.appointment_time DESC
            `, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // UPDATE
   // UPDATE - Ažuriranje termina
static async update(id, appointmentData) {
    try {
        const { service_id, appointment_date, appointment_time, status, notes } = appointmentData;
        
        // Dinamičko formiranje SQL upita
        let query = 'UPDATE appointments SET ';
        let params = [];
        let updates = [];
        
        if (service_id !== undefined) {
            updates.push('service_id = ?');
            params.push(service_id);
        }
        if (appointment_date !== undefined) {
            updates.push('appointment_date = ?');
            params.push(appointment_date);
        }
        if (appointment_time !== undefined) {
            updates.push('appointment_time = ?');
            params.push(appointment_time);
        }
        if (status !== undefined) {
            updates.push('status = ?');
            params.push(status);
        }
        if (notes !== undefined) {
            updates.push('notes = ?');
            params.push(notes);
        }
        
        query += updates.join(', ') + ' WHERE id = ?';
        params.push(id);
        
        await db.query(query, params);
        
        return this.findById(id);
    } catch (error) {
        throw error;
    }
}

    // DELETE
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Appointment;