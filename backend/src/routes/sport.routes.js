const express =
    require("express");

const router =
    express.Router();

const sportController =
    require("../controllers/sport.controller");

const authMiddleware =
    require("../middlewares/auth.middleware");

const adminMiddleware =
    require("../middlewares/admin.middleware");

router.get(
    "/",
    sportController.getAllSports
);

router.get(
    "/:id",
    sportController.getSportById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    sportController.createSport
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    sportController.updateSport
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    sportController.deleteSport
);

module.exports = router;