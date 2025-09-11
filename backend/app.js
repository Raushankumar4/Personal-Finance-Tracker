const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transaction.routes");
const errorHandler = require("./middleware/error.middleware");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.send("Server is Running!");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);

// Error Route Middleware
app.use(errorHandler);

module.exports = app;
