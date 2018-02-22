const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../middleware/secure.middleware');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});

router.get('/', secure.isAuthenticated, userController.show);
router.get('/edit', secure.isAuthenticated, userController.edit);
router.put('/edit', secure.isAuthenticated, userController.saveChanges);
router.post('/follow/:id', secure.isAuthenticated, userController.follow);

router.post('/upload', upload.single('photo'), userController.savePic);

module.exports = router;
