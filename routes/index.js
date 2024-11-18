const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const opsController = require('../controllers/opsController');
const clientController = require('../controllers/clientController');

// Ops User
router.post('/ops/upload', auth('ops'), upload.single('file'), opsController.uploadFile);

// Client User
router.post('/client/signup', clientController.signup);
router.get('/client/download/:fileId', auth('client'), clientController.downloadFile);

module.exports = router;
