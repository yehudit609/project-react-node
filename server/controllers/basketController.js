const Basket = require("../models/Basket")
const Product = require("../models/Product")

const addNewProd = async (req, res) => {

    const { prodId, quant } = req.body

    if (!prodId)
        return res.status(400).json({ message: 'missing field!' })



    const prodInBasket = await Basket.findOne({ prodId: prodId,userId: req.user._id })

    if (prodInBasket) {
        let currentPrice = prodInBasket.price/prodInBasket.quantity
        prodInBasket.quantity = prodInBasket.quantity + 1;
        prodInBasket.price = prodInBasket.quantity * currentPrice
        await prodInBasket.save()

        return res.json("the product updated successfully!!");
    }

    
    else {
        console.log("not prodInBasket:(");
        const foundProd = await Product.findOne({ _id: prodId }).lean()//.populate("_id",{price:1})

        let newProd = null

        if(quant){ //מדובר בהעברת הסל מהלוגין
            newProd = await Basket.create({ userId: req.user._id, prodId: prodId, price: foundProd.price*quant, name: foundProd.name, quantity:quant ,image:foundProd.image})
            //console.log(newProd);
        }
        else{
            newProd = await Basket.create({ userId: req.user._id, prodId: prodId, price: foundProd.price, name: foundProd.name ,image:foundProd.image})
            
            console.log(foundProd.image);
        }

        if (newProd) {
            return res.status(201).json({ message: 'new item added' })
        }
        else {
            return res.status(400).json({ message: 'invalid item' })
        }
    }

}

const getAllCart = async (req, res) => {
    if (req.user) {
        const products = await Basket.find({ userId: req.user._id }).populate("prodId", { isAvailible: 1 });

        // Filter out unavailable products
        const availableProducts = products.filter(product => product.prodId && product.prodId.isAvailible);
        console.log("Available products:", availableProducts);
        if (!availableProducts.length) {
            return res.status(400).json({ message: "No products in basket :(" });
        }

        res.json(availableProducts);
    } else {
        return res.send("no token");
    }
};

const deleteProduct = async (req, res) => { 

    const { id } = req.body

    const prod = await Basket.findById(id).exec()

    if (!prod) {
        return res.status(400).json({ message: 'prod not found!' })
    }

    await prod.deleteOne()

    const reply = `Product ${prod.name} ID ${prod._id} deleted successfuly!`

    res.json(reply)
}


const deleteAllBasket = async (req, res) => {

    if (req.user) {
        const products = await Basket.find({ userId: req.user._id }).lean()//.populate("prodId", { image: 1, name: 1 })

        if (!products?.length) {
            return res.status(400).json({ message: "No products found :(" })
        }
        products.forEach(async e=>{
            //console.log("eeeee: "+e._id);
            await Basket.deleteOne({_id:e._id})
        })

    
        const reply = `Basket deleted successfuly!`

        res.json(reply)
    }
    else
        return res.send("no token")
  
}


const changeQuantityOfProd = async (req, res) => {

    const { id, quantity } = req.body

    if (!id || !quantity) {
        return res.status(400).json({ message: 'missing field!' })
    }

    const prod = await Basket.findById(id).populate("prodId", { price: 1 })

    if (!prod) {
        return res.status(400).json({ message: 'prod not found!' })
    }

    prod.quantity = quantity

    prod.price = quantity * prod.prodId.price

    await prod.save()


    res.json("the product updated successfully!!");
}




module.exports = {
    addNewProd,
    getAllCart,
    deleteProduct,
    changeQuantityOfProd,
    deleteAllBasket
}