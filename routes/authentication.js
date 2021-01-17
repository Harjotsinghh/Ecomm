const express =require('express');
const router = express.Router();
const authControllers = require('../controllers/authentication.js');
const isAuth = require('../middleware/isAuthenticated');
const {check}=require('express-validator');

router.get('/login',authControllers.getLogin);

router.get('/signup',authControllers.getSignup);

router.post('/login',authControllers.postLogin);

router.post('/signup',
check('email','Please enter a valid Email')
    .isEmail(),
check('confirmPassword','Passwords Do not match')
    .custom((value,{req})=>{
        if(req.body.password.trim().toString()!== value.trim().toString())
          throw new Error('Passwords Do not match');
        return true;
    })
,authControllers.postSignup);

router.post('/logout',isAuth,authControllers.postLogout);

module.exports= router;