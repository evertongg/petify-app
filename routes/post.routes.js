const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const secure = require('../middleware/secure.middleware');
const exist = require('../middleware/exist.middleware');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/posts'});


router.post('/:id', upload.single('attach'), postController.addPost);
router.get('/like/:id', postController.updatePost);
router.post('/comment/:id', postController.updateComment);

// router.post('/upload', postController.addPic);


module.exports = router;
