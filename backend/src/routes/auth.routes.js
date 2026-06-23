const express =
    require("express");

const router =
    express.Router();

const upload =
    require("../middlewares/upload.middleware");

const authController =
    require("../controllers/auth.controller");

const authMiddleware =
    require(
        "../middlewares/auth.middleware"
    );

router.post(
    "/register",
    upload.single("profilePicture"),
    authController.register
);

router.post(
    "/login",
    authController.login
);



router.get(
    "/profile",
    authMiddleware,
    authController.getProfile
);

module.exports = router;