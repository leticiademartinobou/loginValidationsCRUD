const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/login", userController.userLogin);
router.get("/profile/:userId", userController.getUsers);
router.post("/", auth.completeUserInfo, userController.createUsers);
// router.post("/register", auth.verifyResult, userController.registerUser);
router.post("/register", userController.registerUser);
router.patch("/", userController.updateUsers);
router.delete("/", userController.deleteUsers);

module.exports = router;
