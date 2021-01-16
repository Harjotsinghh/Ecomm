const express =require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuthenticated');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product',isAuth, adminController.postAddProduct);

router.get('/my-products',isAuth, adminController.getMyProducts);

router.post('/delete',isAuth, adminController.deleteProduct);

module.exports=router;