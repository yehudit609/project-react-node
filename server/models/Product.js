const mongoose = require("mongoose")
const prodSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    description:{
        type:String
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", prodSchema)