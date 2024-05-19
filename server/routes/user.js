const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController");

const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")

router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.createNewUser)
router.delete("/:_id", userController.deleteUser)
router.put("/", userController.updateUser)
router.put("/active/:id", userController.updateUserActive)

module.exports = router
