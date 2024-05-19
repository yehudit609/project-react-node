const mongoose = require("mongoose")
const baskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Product"
    },
    name:{
        type:String,
        //required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type:Number,
        default:1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Basket", baskSchema)