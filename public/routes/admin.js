const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminHome');


router.get('/', adminController.getAdminHome);
router.get('/about', adminController.getAdminAbout);
router.get('/ubungen', adminController.getAdminUbungen);
router.post('/ubungen', adminController.postaddword);
router.post("/ubungen/:id", adminController.postDeleteWord);
router.get('/ubungen/update/:id', adminController.getUpdateWord);
router.post('/ubungen/update/:id', adminController.postUpdateWord);
router.get('/category', adminController.getCategory);
router.post('/category', adminController.postAddCategory);
router.post('/category/:id',adminController.postDeleteCategory);
router.get('/category/categoryupdate/:id', adminController.getUpdateCategory);
router.post('/category/categoryupdate/:id', adminController.postUpdateCategory);
// for offcanvas
router.get('/categories', adminController.getCategories);

module.exports = router;
