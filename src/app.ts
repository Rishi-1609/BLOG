import express, { Application, Request, Response, NextFunction } from "express";

// Swagger Docs import
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Routes Import
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";

// HTTP Security
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { errorHandler } from "./middleware/errorMiddleware";
import { requestLogger } from "./middleware/requestLogger";
import { successResponse } from "./utils/responseHandler";
import { rateLimitErrorFunction } from "./errors/RateLimitError";
import { env } from "./config/env";
import { corsOptions } from "./config/CorsOptions";

const app : Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(requestLogger);

app.route("/health").get((req, res) => {
    successResponse(res, "Server process is running");
})

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorHandler);

export default app;