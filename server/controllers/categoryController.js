const Category = require("../models/Category")
const Product = require("../models/Product")

const createNewCategory = async (req,res)=>{
    const{name, description} = req.body
    if(!name || !description)
        return res.status(400).json({message: 'field are required!!😒'})
    const tmp = await Category.findOne({name:name}).exec()
    if(tmp){
        return res.status(400).json({message:'the categoryname exist!!'})
    }
    const category = await Category.create({name, description})
    if(category){
        return res.status(201).json({message: 'new category created😊'})
    }
    else{
        return res.status(400).json({message:'invalid category😘'})
    }
    
}

const getAllCategories = async (req,res) =>{
    const categorys = await Category.find({},{password:0}).lean()
    if(!categorys?.length){
        return res.status(400).json({message: "no category found😥"})
    }
    res.json(categorys)
}

const getCategoryById = async(req,res)=>{
    const{id} = req.params
    try{
    const category = await Category.findById(id,{password:0}).lean()
    res.json(category)
    }catch(err){
        return res.status(400).json({message: 'category not found😪'})
    }
}

const updateCategory = async (req,res)=>{
    console.log("updateCategory");
    const{_id,name, description} = req.body
    console.log(_id,name, description);
    if (!_id || !name){
        return res.status(400).json({message: 'fields are required!!🙁'})
    }
    const category = await Category.findById(_id).exec()
    console.log(category);
    if(!category){
        return res.status(400).json({message: 'category not found😪😪'})
    }
    category.name=name,
    category.description=description    

    const updatedCategory = await category.save()
    console.log(updatedCategory);
    res.json(`'${updatedCategory.name}' updated😊`)
}

const deleteCategory = async (req,res)=>{
    const{id} = req.params
    const productOnThisCayegory = await Product.find({category:id},{password:0})
    if(productOnThisCayegory){
        return res.status(400).json({message: 'You cannot delete this category because there are products of its type'})
    }
    
    const category = await Category.findById(id).exec()

    if(!category){
        return res.status(400).json({message: 'category not found😪'})
    }
    await category.deleteOne()
    const reply=`category ${category.name} ID ${category._id} deleted`
    res.json(reply)
}

module.exports={
    createNewCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

