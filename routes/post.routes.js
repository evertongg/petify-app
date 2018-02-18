const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const secure = require('../middleware/secure.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const exist = require('../middleware/exist.middleware');

router.post('/:id', postController.addPost);
router.get('/:id', postController.updatePost);
router.post('/', exist.existsUploadsFolder, upload.single('photo'), postController.createPost);



module.exports = router;
