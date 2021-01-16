const express =require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getAddProduct = async (req,res,next)=>{
    res.render('adminstrator/addProducts',{
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
        
    });
}

exports.postAddProduct =(req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    // console.log(req.body);
   
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl:imageUrl,
        userId:req.session.user._id
    })
    product.save()
            .then(result=>{
                res.redirect('/');
               
            })
            .catch(err=>console.log(err));
  
}


exports.getMyProducts = async (req,res,next)=>{
    try{
        const user = req.session.user;
    const products = await Product.find({userId: user._id});
    res.render('adminstrator/myproducts',{
        products:products,
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
    })
    }
    catch(err){
        console.log(err);
        res.redirect('/');
    }
    
};
exports.deleteProduct= async (req,res,next)=>{
    const prodId = req.body.productId;
    try{
        const deletedProduct = await Product.deleteOne({_id: prodId,userId: req.session.user._id});
        const cartDelete= await User.updateMany({},{$pull:{ "cart.items":{productId: prodId }}});
    res.redirect('/admin/my-products');
    }
    catch(err){
        console.log(err);
    }
    
}