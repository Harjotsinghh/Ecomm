const express= require('express');
const router= express.Router();
const ecomController =require('../controllers/ecommerce');
const isAuth = require('../middleware/isAuthenticated');

router.get('/',ecomController.getIndex);

router.post('/details',ecomController.postProductDetail);

router.get('/cart', isAuth, ecomController.getCart);

router.post('/cart',isAuth,ecomController.postCart);

router.post('/delete',isAuth,ecomController.postDelete);

module.exports=router;
