const express =
    require("express");

const router =
    express.Router();

const adminController =
    require("../controllers/admin.controller");

const authMiddleware =
    require("../middlewares/auth.middleware");

const adminMiddleware =
    require("../middlewares/admin.middleware");

router.use(
    authMiddleware,
    adminMiddleware
);

router.get(
    "/dashboard",
    adminController.getDashboardStats
);

router.get(
    "/users",
    adminController.getAllUsers
);

router.get(
    "/teams",
    adminController.getAllTeams
);

router.get(
    "/bookings",
    adminController.getAllBookings
);

router.get(
    "/revenue",
    adminController.getRevenueAnalytics
);

module.exports = router;