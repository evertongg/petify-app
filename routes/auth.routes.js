const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.show);

router.post('/register', authController.doSignup);
// router.post('/login', authController.doLogin);


module.exports = router;
