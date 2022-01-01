const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            name:{
                type:String,
            },
            price:{
                type:Number
            }
        },
    ],
},
{ timestamps: true }

);

module.exports = mongoose.model("Cart", cartSchema);