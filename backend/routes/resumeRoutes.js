const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/resumeController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('resume'), controller.uploadResume);
router.get('/', controller.getAllResumes);
router.get('/:id', controller.getResumeById);

module.exports = router;
