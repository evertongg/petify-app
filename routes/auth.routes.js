const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middleware/secure.middleware');

router.get('/', authController.show);

router.post('/register', authController.doSignup);
router.post('/login', authController.doLogin);

router.get('/logout', secure.isAuthenticated, authController.doLogout);


module.exports = router;
