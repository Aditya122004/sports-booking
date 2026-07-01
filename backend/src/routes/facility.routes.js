const express =
    require("express");

const router =
    express.Router();

const facilityController =
    require("../controllers/facility.controller");

const authMiddleware =
    require("../middlewares/auth.middleware");

const adminMiddleware =
    require("../middlewares/admin.middleware");

const upload =
    require("../middlewares/upload.middleware");

router.get(
    "/",
    facilityController.getFacilities
);

router.get(
    "/:id/availability",
    facilityController.getAvailability
);

router.get(
    "/:id",
    facilityController.getFacilityById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    facilityController.createFacility
);

module.exports = router;