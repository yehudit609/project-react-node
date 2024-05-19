const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController");

const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)

router.get("/", categoryController.getAllCategories)
router.get("/:id", categoryController.getCategoryById)
router.post("/",verifyAdmin, categoryController.createNewCategory)
router.delete("/:id",verifyAdmin, categoryController.deleteCategory)
router.put("/",verifyAdmin, categoryController.updateCategory)

module.exports = router



