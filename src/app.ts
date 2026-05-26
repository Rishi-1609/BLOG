import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import { requestLogger } from "./middleware/requestLogger";

const app : Application = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorHandler);

export default app;