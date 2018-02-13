const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.post('/:id', postController.addPost);

module.exports = router;

