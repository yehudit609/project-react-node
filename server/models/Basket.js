const mongoose = require("mongoose")
const baskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    //לעשות את פרודיד ואת ניימ כפופוליט, למחוק אותם מהמודל ולהביא ברטורנ אול כארט אותם
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
    },
    image:{
        type:String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Basket", baskSchema)