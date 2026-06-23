const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes =
    require("./routes/auth.routes");
const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    "/api/auth",
    authRoutes
);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running"
    });
});

module.exports = app;