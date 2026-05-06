// Model za upravljanje recenzijama (Reviews)
const db = require('../config/database');

class Review {
    // CREATE - Kreiranje nove recenzije
    static async create(reviewData) {
        try {
            const { user_id, rating, comment } = reviewData;
            
            const [result] = await db.query(
                'INSERT INTO reviews (user_id, rating, comment) VALUES (?, ?, ?)',
                [user_id, rating, comment]
            );
            
            return { id: result.insertId, ...reviewData };
        } catch (error) {
            throw error;
        }
    }

    // READ ALL - Dohvati sve recenzije sa korisničkim podacima
    static async findAll() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    r.*,
                    u.name as user_name,
                    u.email as user_email
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                ORDER BY r.created_at DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // READ BY ID - Dohvati recenziju po ID-u
    static async findById(id) {
        try {
            const [rows] = await db.query(`
                SELECT 
                    r.*,
                    u.name as user_name,
                    u.email as user_email
                FROM reviews r
                JOIN users u ON r.user_id = u.id
                WHERE r.id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // READ BY USER - Dohvati recenzije korisnika
    static async findByUser(userId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC',
                [userId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // UPDATE - Ažuriranje recenzije
    static async update(id, reviewData) {
        try {
            const { rating, comment } = reviewData;
            
            await db.query(
                'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
                [rating, comment, id]
            );
            
            return this.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // DELETE - Brisanje recenzije
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // GET AVERAGE RATING - Dohvati prosječnu ocjenu
    static async getAverageRating() {
        try {
            const [rows] = await db.query('SELECT AVG(rating) as average FROM reviews');
            return rows[0].average || 0;
        } catch (error) {
            throw error;
        }
    }

    // GET RATING STATS - Statistika ocjena
    static async getRatingStats() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    rating,
                    COUNT(*) as count
                FROM reviews
                GROUP BY rating
                ORDER BY rating DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Review;