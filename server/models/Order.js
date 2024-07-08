const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    //שם,כמות,מחיר, תמונה, סטטוס
    products: [{prodId:mongoose.Schema.Types.ObjectId, name:String,quantity:Number, price:Number,image:String}],
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
    status:{
        type: String,
        enum: ["בטיפול","בדרך אליך","הגיעה ליעדה"],
        default: "בטיפול"
    },
    message:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)