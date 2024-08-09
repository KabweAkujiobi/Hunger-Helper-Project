const db = require('../config/db');

const Donations = {
    create: (donation, callback) => {
        const query = 'INSERT INTO donations (title, description, foodType, quantity, donorId, location) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [donation.title, donation.description, donation.foodType, donation.quantity, donation.donorId, donation.location];
        db.query(query, values, callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM donations WHERE id = ?';
        db.query(query, [id], callback);
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM donations';
        db.query(query, callback);
    },

    updateById: (id, donation, callback) => {
        const query = 'UPDATE donations SET title = ?, description = ?, foodType = ?, quantity = ?, location = ? WHERE id = ?';
        const values = [donation.title, donation.description, donation.foodType, donation.quantity, donation.location, id];
        db.query(query, values, callback);
    },

    deleteById: (id, callback) => {
        const query = 'DELETE FROM donations WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Donations;