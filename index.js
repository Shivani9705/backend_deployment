import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
    path: ".env",
});

const PORT = process.env.PORT || 3000;

// Connect to the database
databaseConnection();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = [
    "https://majestic-pasca-ab4588.netlify.app", // Netlify frontend
    "http://localhost:3000", // Local development
];

// Dynamic CORS setup
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);


// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
});
