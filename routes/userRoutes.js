import express from "express";
import multer from "multer";
import { check } from "express-validator";
import UserService from "../controllers/userController.js";
import path from "path";


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      return cb(
        new Error("Only images are allowed (jpeg, jpg, png, gif)", false)
      );
    }
  },
});

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
router.get("/users/:id", UserService.getUserById);
router.patch("/users/:id", UserService.updateUser);
router.delete("/users/:id", UserService.deleteUser);

export default router;
