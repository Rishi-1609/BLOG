import express from "express";
import dotenv from "dotenv";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import { connectDB } from "./config/database";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

console.log("Starting server");
app.listen(PORT, () => {
  console.log(`Server is running on at http://localhost:${PORT}`)
});

console.log("Connecting to Database");
connectDB().catch((err) => {
  console.log(err);
});