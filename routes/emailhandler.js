const express = require('express');
const Router = express.Router();
var nodemailer = require('nodemailer');


Router.post('/send-mail',async (req,res,next)=>{
    const email= req.body.email;
    const message = req.body.message;
    var from = "harjots.ec@gmail.com"

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: from,
           pass: 'harjot@gmail123'
       }
   
  });

  let info = await transporter.sendMail({
    from: email,
    html:message,
    to: "harjotsingh206@gmail.com", 
    subject: " I want to contact...", 
    sender:email,
    replyTo:email,
    text: message,
  });

  console.log("Message sent: %s", info.messageId);

  res.redirect('/');
})


module.exports= Router;