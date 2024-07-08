const Order = require("../models/Order")

const createNewOrder = async (req,res)=>{
    const {userId, products,address, price,date,message} = req.body
    if(!userId || !products)
        return res.status(400).json({message: 'field are required!!😒'})
   // console.log(products);
    const order = await Order.create({userId, products,address, price,date,message})
    if(order){
        //console.log(order);
        return res.status(201).json({message: 'new order created😊'})
    }
    else{
        return res.status(400).json({message:'invalid order😘'})
    }
}

const getAllOrders = async (req,res) =>{
    const orders = await Order.find({},{password:0}).populate("userId",{email:1,address:1})
    if(!orders?.length){
        return res.status(400).json({message: "no order found😥"})
    }
    res.json(orders)
    //userId
}

const getProvidedOrders = async (req,res) =>{
    const orders = await Order.find({provided:true},{password:0}).lean()
    if(!orders?.length){
        return res.status(400).json({message: "no order found😥"})
    }
    res.json(orders)
}

const getNotProvidedOrders = async (req,res) =>{
    const orders = await Order.find({provided:false},{password:0}).lean()
    if(!orders?.length){
        return res.status(400).json({message: "no order found😥"})
    }
    res.json(orders)
}

const getOrderById = async(req,res)=>{
    const {id} = req.params
    console.log("getOrderById: "+id);
    try{
        const order = await Order.find({userId:id},{password:0}).lean()
        res.json(order)
    }catch(err){
        return res.status(400).json({message: 'orders not found😪'})
    }
}

const updateOrder = async (req,res)=>{
    const{id,status} = req.body
    if (!id || !status){
        return res.status(400).json({message: 'fields are required!!🙁'})
    }
    const order = await Order.findById(id).exec()
    if(!order){
        return res.status(400).json({message: 'order not found😪😪'})
    }
    order.status = status

    const updatedOrder = await order.save()

    res.json(`'${updatedOrder.date}' updated😊`)
}

const deleteOrder = async (req,res)=>{
    const {id} = req.params
    const order = await Order.findById(id).exec()
    if(!order){
        return res.status(400).json({message: 'order not found😪'})
    }
    await order.deleteOne()
    const reply=`order ${order.name} ID ${order._id} deleted`
    res.json(reply)
}

module.exports={
    createNewOrder,
    getAllOrders,
    getProvidedOrders,
    getNotProvidedOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}