import express from "express";
import { check } from "express-validator";
import UserService from "../controllers/userController.js";
import upload from "../config/uploadConfig.js";


const router = express.Router();

router.post(
  "/users",
  [
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  upload.single("profilePicture"),
  UserService.createUser
);
router.post("/users/login", UserService.loginUser);
router.get("/users", UserService.getAllUsers);
router.patch(
  "/users/:id",
  upload.single("profilePicture"),
  UserService.updateUser
);
router.delete("/users/:id", UserService.deleteUser);
router.get("/users/:id", UserService.getUserById);

export default router;
