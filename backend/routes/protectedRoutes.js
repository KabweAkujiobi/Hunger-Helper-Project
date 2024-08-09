const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/protected', authenticateJWT, (req, res) => {
  res.status(200).send('You have access to this protected route.');
});

module.exports = router;