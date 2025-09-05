import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
