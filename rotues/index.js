const express = require('express');
const uploadController = require('../controllers/uploadController');
const errorController = require('../controllers/errorController');
const indexController = require('../controllers/indexController');
const jsonTestController = require('../controllers/jsonTestController');

const router = express.Router();

router.all('/json', jsonTestController);

router.get('/index', indexController);

router.post('/storage/uploadfile', uploadController);

router.get('/error', errorController);

router.post('/storage/superfile', require('../controllers/uploadSlice'));
router.post('/storage/merge', require('../controllers/mergeUploadSlice'));

module.exports = router;
