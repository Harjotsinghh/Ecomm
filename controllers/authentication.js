const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult}=require('express-validator');
const { ContactlessOutlined } = require('@material-ui/icons');

exports.getLogin = async (req,res, next)=>{

    const error = req.flash('error');
    res.render('authentication/login',{
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user,
        error: error
    });

}

exports.getSignup = async (req,res,next)=>{
    const errors= req.flash('error');
    res.render('authentication/signup',
    {
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user,
        error: errors
    });
}

exports.postLogin = async (req,res,next)=>{
    const email = req.body.email;
    const password= req.body.password;
    try{
        const findUser = await User.findOne({email:email});
        if(!findUser)
            throw new Error('user not found');
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        if(!isPasswordCorrect)
        {
            req.flash('error','Enter correct Email or Password')
          return res.redirect('/login');
        }
        req.session.isAuthenticated = true;
        req.session.user = findUser;
        const saveSession = await req.session.save();
    
         res.redirect('/');
    }
    catch (error){
        req.flash('error','Enter correct Email or Password')
        return res.redirect('/login');
    }
   
}
exports.postSignup =  async (req,res,next)=>{
    const errors= validationResult(req).array();
    if(errors){
        const email=req.body.email;
        const name= req.body.name;
        const password=req.body.password;
        const confirmPassword= req.body.confirmPassword;
        return res.render('authentication/signup',
        {
            isAuthenticated: req.session.isAuthenticated,
            user: req.session.user,
            error: [errors[0].msg],
            prev:{email:email, name: name,password:password,confirmPassword:confirmPassword},
        });
    }
    try{
        const userDoc = await User.findOne({email: req.body.email});
  if(userDoc)
  {
    req.flash('error', 'User already exists!! ');
    return res.redirect('/signup');
  }

    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password: hashedPassword,
        cart: {items:[]}
    });
    const savedUser = await  user.save();
    return res.redirect('/login');

    }
    catch(err){
        console.log(err);
        res.redirect('/signup');
    }

  
}
exports.postLogout = async (req,res,next)=>{
   
    req.session.destroy();
    res.redirect('/');
}