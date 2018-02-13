const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');

router.get('/', userController.show);
router.get('/edit', userController.edit);
router.post('/user', postController.addPost);

module.exports = router;
