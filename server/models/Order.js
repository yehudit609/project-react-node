const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    products: [{prodId:mongoose.Schema.Types.ObjectId, name:String, price:Number,category:mongoose.Schema.Types.ObjectId}],
    price:{
        type: Number,
        required: true
    },
    address:{
        type:String
    },
    date:{
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    provided:{
        type: Boolean,
        default: false
    },
    message:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)