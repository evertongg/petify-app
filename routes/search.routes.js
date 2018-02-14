const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middleware/secure.middleware');

router.post('/', secure.isAuthenticated, searchController.showResults);

module.exports = router;
