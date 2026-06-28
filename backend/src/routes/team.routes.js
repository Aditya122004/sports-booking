const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middlewares/auth.middleware");

const teamController =
    require("../controllers/team.controller");

router.post(
    "/",
    authMiddleware,
    teamController.createTeam
);

router.post(
    "/:id/members",
    authMiddleware,
    teamController.addMember
);
router.get(
    "/my",
    authMiddleware,
    teamController.getMyTeams
);

router.get(
    "/:id",
    authMiddleware,
    teamController.getTeamById
);

router.delete(
    "/:id/members/:memberId",
    authMiddleware,
    teamController.removeMember
);

module.exports = router;