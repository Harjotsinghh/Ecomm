const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    cart:{
        items:[{
            productId:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },

            quantity:{
               type: Number,
               require:true
            }
        }]
        

    }

});

schema.methods.AddToCart= function(product){

    const inCart= this.cart.items.findIndex(item=>{
        return item.productId.toString() === product._id.toString();
    });
    let updatedCartItems = [...this.cart.items];
    if(inCart>=0){
        updatedCartItems[inCart].quantity += 1;
    }
    else{
        updatedCartItems.push({productId: product._id, quantity: 1});
    }
    let ucart= {items: updatedCartItems};
    this.cart = ucart;
    return this.save();
}

schema.methods.deleteProduct = function(prodId){
    const updatedcart = this.cart.items.filter(item=>{
        return item.productId.toString()!== prodId.toString();
    });

    this.cart.items = updatedcart;
    return this.save();

}


module.exports = mongoose.model('User',schema);