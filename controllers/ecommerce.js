const express= require('express');
const mongoose = require('mongoose');

const Product =require('../models/Product.js');
const User = require('../models/User');

exports.getIndex= async (req,res,next)=>{
    
    const products = await Product.find();
    res.render('ecommerce/index.ejs',{
        products:products,
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
    });
};


exports.postProductDetail =async (req,res,next)=>{
    const prodId = req.body.productId;
    const product = await Product.findById(prodId).populate('userId');
    res.render('ecommerce/detail',{
        product:product,
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
       
    });
}

exports.getCart = async (req,res,next)=>{
    try{
        const user_id  =  req.session.user._id;
        const user = await User.findById(user_id).populate('cart.items.productId');
        

        if(!user){
            throw new Error('Not Logged IN');
            
        }
        let total_price=0;
        let arr= user.cart.items;
       arr= arr.filter(item=>{
            return item.productId!=null;
        });
        // console.log(arr);
    
        for(let i=0; i<arr.length;i++)
        {
            total_price+=arr[i].productId.price * arr[i].quantity;
        }
        res.render('ecommerce/cart',{
            cart: arr,
            total_price:total_price,
            isAuthenticated: req.session.isAuthenticated,
            user: req.session.user
        });
    }
    catch(err){
        console.log(err);
    }
  


}

exports.postCart =  async(req,res,next)=>{
    console.log(req.body.productId);
   try{
    const prodId = await req.body.productId;
    const product = await Product.findById(prodId);
    const myuser_id =  req.session.user._id;
    const user =await User.findById(myuser_id);
    const updatedUser =  user.AddToCart(product);
    res.redirect('/cart');
   }
   catch(err){
    console.log(err);
    res.redirect('/');
   }
  

}
exports.postDelete = async (req,res,next)=>{
    const prodId = req.body.productId;
    const myuser_id =  req.session.user._id;
    const user =await User.findById(myuser_id);
    
    const updatedCart = await user.deleteProduct(prodId);
    res.redirect('/cart');
}