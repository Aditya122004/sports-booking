const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middlewares/auth.middleware");

const bookingController =
    require("../controllers/booking.controller");

router.post(
    "/",
    authMiddleware,
    bookingController.createBooking
);

router.get(
    "/my",
    authMiddleware,
    bookingController.getMyBookings
);

module.exports = router;