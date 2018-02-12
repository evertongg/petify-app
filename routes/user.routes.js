const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.show);
router.get('/edit', userController.edit);

module.exports = router;
