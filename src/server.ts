import app from "./app";
import { connectDB } from "./config/database";
import { logger } from "./config/pinoLogger";

const PORT = process.env.PORT || 3000;

const startServer = async() => {
    try {
        await connectDB();
        logger.info("Database connection established");

        app.listen(PORT, () => {
            logger.info(`Server listening at http://localhost:${PORT}`);
        })
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

startServer();