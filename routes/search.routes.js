const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const secure = require('../middleware/secure.middleware');

router.post('/', secure.isAuthenticated, searchController.showResults);
router.get('/', secure.isAuthenticated, searchController.show);

module.exports = router;
