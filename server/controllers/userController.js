const User = require("../models/User")
const bcrypt = require('bcrypt')

const createNewUser = async (req, res) => {
    const { userName, password, name, email, address, phone, active } = req.body
   // console.log("aaaaaaaaaabbbbbbbbbbb");
    //console.log(userName, password, name, email, address, phone, active );
    if (!userName || !password || !name || !email){
        return res.status(400).json({ message: 'field are required!!😒' })}
    const tmp = await User.findOne({ userName: userName }).exec()
    if (tmp) {
        return res.status(400).json({ message: 'the username is already exist!!' })
    }
    const hashPwd = await bcrypt.hash(password,10)

    const user = await User.create({ userName, password:hashPwd, name, email,roles:"Admin" }) // , address, roles, phone, active 
       //  console.log("nooooooooooooooooooooooootttttt");

    if (user) {
        return res.status(201).json({ message: 'new user created😊' })
    }
    else {
        return res.status(400).json({ message: 'invalid user😘' })
    }
}

const getAllUsers = async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    try{
    const users = await User.find({}, { password: 0 }).lean()
    if (!users?.length) {
        return res.status(400).json({ message: "no user found😥" })
    }
    res.json(users)
    }catch{
        res.json("error")
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id, { password: 0 }).lean()
        res.json(user)
    } catch (err) {
        return res.status(400).json({ message: 'user not found😪' })
    }
}

const updateUser = async (req, res) => {
    const { _id, userName, name, email, phone, active, address} = req.body
    if (!_id || !userName || !name) {
        return res.status(400).json({ message: 'fields are required!!🙁' })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found😪😪' })
    }
    // console.log(address);
    // user.address
    // const address2 = `${address.city}  ${address.street}   ${address.building}`
    // console.log(address2);
    
    user.userName = userName,
    user.name = name,
    user.email = email, 
    user.phone = phone,
    user.address = address,
    user.active = active

    const updatedUser = await user.save()

    res.json(`'${updatedUser.name}' updated😊`) 
}

const updateUserActive = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found😪' })
    }
    user.active = !user.active
    user.save()
    res.json(`the user '${user.name}' updated😉`)
}

const deleteUser = async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found😪' })
    }
    await user.deleteOne()
    const reply = `user ${user.name} ID ${user._id} deleted`
    res.json(reply)
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserActive,
    deleteUser
} 