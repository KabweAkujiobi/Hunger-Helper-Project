const Donations = require('../models/donationModel');

// Create a new donation
exports.createDonation = async (req, res) => {
    try {
        const { title, description, foodType, quantity, location } = req.body;
        const donorId = req.user.id; // Assuming you have the donor's ID from the authenticated user
        
        const newDonation = { title, description, foodType, quantity, donorId, location };

        const result = await new Promise((resolve, reject) => {
            Donations.create(newDonation, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(201).json({ id: result.insertId, ...newDonation });
    } catch (err) {
        console.error('Error creating donation:', err);
        res.status(500).json({ error: 'Failed to create donation' });
    }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await new Promise((resolve, reject) => {
            Donations.findAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json(donations);
    } catch (err) {
        console.error('Error fetching donations:', err);
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
};

// Get a single donation by ID
exports.getDonationById = async (req, res) => {
    try {
        const donation = await new Promise((resolve, reject) => {
            Donations.findById(req.params.id, (err, result) => {
                if (err) return reject(err);
                if (!result.length) return resolve(null);
                resolve(result[0]);
            });
        });

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (err) {
        console.error('Error fetching donation:', err);
        res.status(500).json({ error: 'Failed to fetch donation' });
    }
};

// Update a donation
exports.updateDonation = async (req, res) => {
    try {
        const { title, description, foodType, quantity, location } = req.body;
        const updatedDonation = { title, description, foodType, quantity, location };

        const result = await new Promise((resolve, reject) => {
            Donations.updateById(req.params.id, updatedDonation, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json({ id: req.params.id, ...updatedDonation });
    } catch (err) {
        console.error('Error updating donation:', err);
        res.status(500).json({ error: 'Failed to update donation' });
    }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            Donations.deleteById(req.params.id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (err) {
        console.error('Error deleting donation:', err);
        res.status(500).json({ error: 'Failed to delete donation' });
    }
};