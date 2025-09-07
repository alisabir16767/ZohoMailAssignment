import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors({
  origin: true,          // allow all origins
  credentials: true,     // allow cookies / auth headers
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
