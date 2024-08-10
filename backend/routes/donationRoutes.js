const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new donation
router.post('/', authenticateJWT, donationsController.createDonation);

// Get all donations
router.get('/', donationsController.getAllDonations);

// Get a single donation by ID
router.get('/:id', authenticateJWT, donationsController.getDonationById);

// Update a donation
router.put('/:id', authenticateJWT, donationsController.updateDonation);

// Delete a donation
router.delete('/:id', donationsController.deleteDonation);

module.exports = router;