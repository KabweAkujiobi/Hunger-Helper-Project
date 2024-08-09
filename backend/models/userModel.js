const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (beneficiaryType, organisationType, organisationName, firstName, lastName, donationRole, contactNumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [user.beneficiaryType,  user.organisationType, user.organisationName, user.firstName, user.lastName, user.donationRole, user.contactNumber, user.email, user.password];
        db.query(query, values, callback);
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = User; 