const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes =
    require("./routes/auth.routes");
const sportRoutes =
    require("./routes/sport.routes");
const app = express();
const teamRoutes =
    require("./routes/team.routes");
const facilityRoutes =
    require("./routes/facility.routes");
const bookingRoutes=
    require("./routes/booking.routes");
const paymentRoutes=
    require("./routes/payment.routes")
const adminRoutes =
    require("./routes/admin.routes");

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/sports",
    sportRoutes
);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running"
    });
});

app.use(
    "/api/teams",
    teamRoutes
);


app.use(
    "/api/facilities",
    facilityRoutes
);
app.use(
    "/api/bookings",
    bookingRoutes
);

app.use(
    "/api/payments",
    paymentRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

module.exports = app;