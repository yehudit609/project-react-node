const Product = require("../models/Product")
const Category = require("../models/Category")

const createNewProduct = async (req,res)=>{
    console.log("createNewProduct in productController");
    const{name, price, category} = req.body
    if(!name || !price || !category||!req.file){
        return res.status(400).json({message: 'field are required!!😒'})
    }
    console.log(req.file);

    const tmp = await Product.findOne({name:name}).exec()
    if(tmp){
        return res.status(400).json({message:'the productname is already exist!!'})
    }
    const product = await Product.create({name, price, category,image:req.file.path})
    if(product){
        return res.status(201).json({message: 'new product created😊'})
    }
    else{
        return res.status(400).json({message:'invalid product😘'})
    }
    
}


const getAllProduct = async (req, res) => {
    console.log("hi, get all products");
    // Fetch only products that are available
    const products = await Product.find({isAvailible:true}).lean();

    if (!products?.length) {
        return res.status(400).json({ message: "nono product found😥" });
    }
    res.json(products);
};

const getAllProductWithCategoryName = async (req,res) =>{
    console.log("productttttttttttttttttttt");
    const product = await Product.find({isAvailible:true}).populate("category",{name:1})
    console.log(product);
    if(!product || product?.length==0){console.log('in if');
        return res.status(400).json({message: "no product found😥"})
    }
    res.json(product)    
}



const getProductById = async(req,res)=>{
    const{id} = req.params
    try{
    const product = await Product.findById(id,{password:0}).lean()
    res.json(product)
    }catch(err){
        return res.status(400).json({message: 'product not found😪'})
    }
}

const getProductByCategory = async(req,res)=>{
    console.log("111111111111111666666666666666");
    const{categoryName} = req.params
    console.log("categoryName: ",categoryName);
    //console.log("111111111111111111111",categoryName);
    try{
        const category1 = await Category.find({name:categoryName})
        console.log(category1[0]);
        const product = await Product.find({category:category1[0]._id, isAvailible: true},{password:0})
        console.log("products: "+product );
         res.json(product)
    }catch(err){
        return res.status(400).json({message: 'product not found😪'})
    }
}


const updateProduct = async (req,res)=>{
    //console.log("yow!!!!!!!!!!!!!!!!! I am here!!!!!!!");
    const{_id,name, price, category,calories,popular} = req.body
    if (!_id || !name || !price ){
        if(!_id)
            return res.status(400).json({message: 'fields _id!!'})
        if(!name)
            return res.status(400).json({message: 'fields name!!'})
        if(!price)
            return res.status(400).json({message: 'fields price!!'})
    }
    const product = await Product.findById(_id).exec()
    if(!product){
        return res.status(400).json({message: 'product not found😪😪'})
    }
    const tmp = await Product.findOne({name:name}).exec()
    if(tmp && product.name!=name){
        return res.status(400).json({message:'the productname exist!!'})
    } 
   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    product.name=name,
    product.price=price,
    product.category=category,
    product.image = req.file?req.file.path:product.image;
    //console.log(product.image);
    //console.log(category);
    const updatedProduct = await product.save()

    res.json(`'${updatedProduct.name}' updated😊`)
}

const deleteProduct = async (req,res)=>{
    const{id} = req.params
    const product = await Product.findById(id).exec()
    if(!product){
        return res.status(400).json({message: 'product not found😪'})
    }
    //await product.deleteOne()
    product.isAvailible = false
    await product.save();
    const reply=`product ${product.name} ID ${product._id} deleted`
    res.json(reply)
}

module.exports={
    createNewProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    getAllProductWithCategoryName
}