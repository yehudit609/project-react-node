const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController");
const multer =require('multer')

const upload = multer({dest:"./public/uploads"})
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin");

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        cb(null, './public/uploads')
    },
    filename : function(req, res, cb){
        const uniqeSuffix = Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null, uniqeSuffix +".jpg")
    }
})


router.get("/", productController.getAllProduct)

//router.get("/:id", productController.getProductById)

router.get("/category/:categoryName", productController.getProductByCategory)

router.use(verifyJWT)

router.get("/withCategoryName",verifyAdmin, productController.getAllProductWithCategoryName)
// router.post("/",verifyAdmin,upload.single("Img"), productController.createNewProduct)
router.post("/",verifyAdmin,upload.single('image'), productController.createNewProduct)

router.delete("/:id",verifyAdmin, productController.deleteProduct)
router.put("/",verifyAdmin,upload.single('image'), productController.updateProduct)

module.exports = router

