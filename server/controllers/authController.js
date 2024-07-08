const User = require("../models/User")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res)=>{
    const {userName,password} = req.body
    if(!userName || !password){
        return res.status(400).json({message:'fields username and password are required!'})
    }      

    const foundUser = await User.findOne({userName}).lean()
    if(!foundUser || !foundUser.active){
         return res.status(401).json({message:'UnauthorizedLogin1'})
    }

    const match = await bcrypt.compare(password,foundUser.password)

    if(!match){
        return res.status(401).json({message:'UnauthorizedLogin2'})
    }
    console.log("foundUser.phone: "+foundUser.phone);
    const userInfo = {_id:foundUser._id, name:foundUser.name, roles: foundUser.roles, userName:foundUser.userName,email:foundUser.email,address:foundUser.address,phone:foundUser.phone}
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    res.json({token:token})
   
    //res.send("Logged In")
}

const register = async (req, res)=>{
    //roles and active-only admin
   
    const {userName,password,name,email,phone,address} = req.body
    if(!userName ||!name || !password){
        return res.status(400).json({message:'fields username, name and password are required!'})
    }
    const duplicate = await User.findOne({userName:userName}).lean()
    if(duplicate){    
        return res.status(409).json("Duplicate userName")
    }
    const hashPwd = await bcrypt.hash(password,10)
    const userObject = {userName,name,password:hashPwd,email,phone,address}    
    const user = await User.create(userObject)
    if(user){
        console.log("I am here!!");
        return res.status(201).json({ message: `New User ${user.userName} created` })
    }
    return res.status(400).json({ message: 'Invalid User' })
}

module.exports = {login,register}