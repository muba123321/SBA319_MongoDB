import mongoose from "mongoose";
import "dotenv/config";



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error connecting to DB", err.message);
    process.exit(1);
  }
};

export default dbConnection;
