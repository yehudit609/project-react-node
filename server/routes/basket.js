const express = require("express")
const router = express.Router()
const basketController = require("../controllers/basketController");

const verifyJWT = require("../middleware/verifyJWT")
// const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)


router.get("/", basketController.getAllCart)

router.post("/", basketController.addNewProd)
router.delete("/", basketController.deleteProduct)
router.delete("/allBasket", basketController.deleteAllBasket)
router.put("/", basketController.changeQuantityOfProd)
module.exports = router

