const mongoose = require('mongoose');

//schema 

const ProductSchema = new mongoose.Schema({

    price: { type : String , required : true },
    name: { type : String , required : true },
    id : { type : String ,  required : true }

})

mongoose.model("Product",ProductSchema)