const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const secure = require('../middleware/secure.middleware');

router.post('/:id', postController.addPost);



module.exports = router;
