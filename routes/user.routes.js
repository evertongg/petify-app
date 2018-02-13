const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../middleware/secure.middleware');

router.get('/', userController.show);
router.get('/edit', secure.isAuthenticated, userController.edit);


module.exports = router;
