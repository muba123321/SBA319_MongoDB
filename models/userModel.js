import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/uploads/default.png"
  },
  joinedActivities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
});
// lets create some index
userSchema.index({ email: 1 });
userSchema.index({ name: 1 });
userSchema.index({ joinedActivities: 1 });
userSchema.index({ joinedActivities: 1, name: 1 });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
