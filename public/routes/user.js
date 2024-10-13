const express = require('express');
const router = express.Router();
const homeController = require('../controller/home'); // '../controller/home' olmalı
const { route } = require('./admin');

router.get('/', homeController.getHome);
router.get('/about', homeController.getUberUns);
router.get('/ubungen', homeController.getUbungen);
router.post('/ubungen', homeController.postUbungen);
router.post('/reset', homeController.resetTest);
router.get('/content', homeController.getShowCategory);

module.exports = router;
