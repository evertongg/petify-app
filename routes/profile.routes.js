const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

router.get('/:id', profileController.show);

module.exports = router;
