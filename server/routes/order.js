const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController");

const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)

router.get("/", orderController.getAllOrders)//verifyAdmin,
router.get("/notProvided",verifyAdmin, orderController.getNotProvidedOrders)
router.get("/Provided",verifyAdmin, orderController.getProvidedOrders)
router.get("/:id", orderController.getOrderById)
router.post("/", orderController.createNewOrder)
router.delete("/:id",verifyAdmin, orderController.deleteOrder)
router.put("/", orderController.updateOrder)//verifyAdmin,

module.exports = router
