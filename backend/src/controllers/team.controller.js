const teamService =
    require("../services/team.service");

const createTeam = async (
    req,
    res
) => {

    try {

        const {
            name,
            sportId
        } = req.body;

        const teamId =
            await teamService.createTeam(
                name,
                sportId,
                req.user.id
            );

        res.status(201).json({
            success: true,
            teamId
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const addMember = async (
    req,
    res
) => {

    try {

        await teamService.addMember(
            req.params.id,
            req.user.id,
            req.body.email
        );

        res.status(200).json({
            success: true,
            message:
                "Member added"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message:
                error.message
        });
    }
};
const getTeamById = async (
    req,
    res
) => {

    try {

        const team =
            await teamService
                .getTeamById(
                    req.params.id
                );

        res.status(200).json({
            success: true,
            team
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
const getMyTeams = async (
    req,
    res
) => {

    try {

        const teams =
            await teamService
                .getMyTeams(
                    req.user.id
                );

        res.status(200).json({
            success: true,
            teams
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const removeMember = async (
    req,
    res
) => {

    try {

        await teamService
            .removeMember(
                req.params.id,
                req.user.id,
                req.params.memberId
            );

        res.status(200).json({
            success: true,
            message:
                "Member removed"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message:
                error.message
        });
    }
};
module.exports = {
    createTeam,
    addMember,
    getTeamById,
    getMyTeams,
    removeMember
};