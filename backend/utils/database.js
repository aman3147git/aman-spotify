import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db=async()=>{
try {
  await mongoose.connect(process.env.MONGO);
  console.log("Database connected!!"); 
} catch (error) {
  return res.status(500).json({ error: "Internal server error" });
}
}
export default db;
