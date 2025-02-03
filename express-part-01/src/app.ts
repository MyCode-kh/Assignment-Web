import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./routes/v1/routes";
import { globalErrorHandler } from "./middlewares/global-error";
import { allowedOrigins, corsOptions } from "./middlewares/allowsReq";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json());

// Configure CORS to allow requests from localhost:3000
// Apply CORS configuration
app.use(corsOptions);

console.log(`allowedOrigins : ${allowedOrigins}`);

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/user-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
app.use(globalErrorHandler);

export default app;
