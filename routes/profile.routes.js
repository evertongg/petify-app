const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const secure = require('../middleware/secure.middleware');

router.get('/:id', secure.isAuthenticated, profileController.show);

module.exports = router;
