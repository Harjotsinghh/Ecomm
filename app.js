const express = require('express');
const bodyParser= require('body-parser');
const app=express();
const path =require('path');
const mongoose =require('mongoose');
const User = require('./models/User');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const flash = require('express-flash');
const emailhandler = require('./routes/emailhandler');
const errorController = require('./controllers/errors.js');
const helmet = require('helmet');

const mongoDb_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vuvyc.mongodb.net/${process.env.MONGO_DATABASE}`;

const ecomRoutes = require('./routes/ecommerce');
const adminRoutes=require('./routes/admin');
const authRoutes= require('./routes/authentication');

var store= new mongoDbStore({
    uri: mongoDb_URI,
    collection:'mySessions'
});

app.set('views', 'views');
app.set('view engine','ejs');

app.use(helmet());

app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'funkyou',
    saveUninitialized:false,
    resave:false,
    store:store
}));


app.use(flash());
app.use(ecomRoutes);
app.use('/admin',adminRoutes);
app.use(authRoutes);
app.use(emailhandler);
app.use(errorController);


mongoose.connect(mongoDb_URI,{useNewUrlParser: true,useUnifiedTopology: true })
.then(result=>{
    app.listen(process.env.port||3000);
})
.catch(err=>{
    console.log(err);
})
