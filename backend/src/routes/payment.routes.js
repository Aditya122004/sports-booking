const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middlewares/auth.middleware");

const paymentController =
    require("../controllers/payment.controller");

router.post(
    "/verify",
    authMiddleware,
    paymentController.verifyPayment
);

module.exports = router;