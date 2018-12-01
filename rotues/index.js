const express = require('express');
const uploadController = require('../controllers/uploadController');
const errorController = require('../controllers/errorController');

const router = express.Router();

router.post('/upload', uploadController);

router.get('/error', errorController);

module.exports = router;
