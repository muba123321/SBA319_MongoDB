import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// create a new user in the database
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profilePicture = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    const newUser = new User({
      name,
      email,
      password,
      profilePicture,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login an already existing user.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatch = await user.comparePassword(password);

    if (user && isMatch) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // .select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    // .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;
    const updateFields = {
      name,
      email,
    };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }
    if (req.file) {
      updateFields.profilePicture = `/uploads/${req.file.filename}`;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateFields,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password: pwd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
