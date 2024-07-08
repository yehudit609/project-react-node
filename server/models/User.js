const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email:{
        type: mongoose.Schema.Types.String,
        lowercase:true,
        required: true

    },
    phone:{
        type: String,
    },
    address:{
        type: String
    },
    roles:{
        type: String,
        enum: ["User","Admin"],
        default: "User"
    },
    active:{
        type:mongoose.Schema.Types.String,
        default: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)
