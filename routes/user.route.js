import express from "express";
const router = express.Router();
import UserController from "../controller/user.controller.js";

const userController = new UserController();

//get all users
router.get("/", userController.getAllUsers);

//Add a new user
router.post("/add", userController.addUser);

//Get a user by ID
router.get("/:id", userController.getUserById);

//Update a user by ID
router.put("/update/:id", userController.updateUser);

//delete a user by ID
router.delete("/delete/:id", userController.deleteUser);

//search by user's name   .../users/search/by/?name=abc
router.get("/search/by", userController.searchByName);
export default router;
