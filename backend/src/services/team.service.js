const teamRepository =
    require("../repositories/team.repository");

const userRepository =
    require("../repositories/user.repository");

const createTeam = async (
    name,
    sportId,
    captainId
) => {

    const teamId =
    await teamRepository.createTeam(
        name,
        sportId,
        captainId
    );

await teamRepository.addMember(
    teamId,
    captainId
);

return teamId;
};

const addMember = async (
    teamId,
    captainId,
    email
) => {

    const team =
        await teamRepository
            .getTeamById(teamId);

    if (!team) {
        throw new Error(
            "Team not found"
        );
    }

    if (
        team.captain_id !== captainId
    ) {
        throw new Error(
            "Only captain can add members"
        );
    }

    const user =
        await userRepository
            .findUserByEmail(email);

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    const alreadyMember =
        await teamRepository.isMember(
            teamId,
            user.id
        );

    if (alreadyMember) {
        throw new Error(
            "Already a member"
        );
    }

    await teamRepository.addMember(
        teamId,
        user.id
    );
};

const getTeamById = async (
    teamId
) => {

    const team =
        await teamRepository
            .getTeamById(teamId);

    if (!team) {
        throw new Error(
            "Team not found"
        );
    }

    const members =
        await teamRepository
            .getTeamMembers(teamId);

    return {
        ...team,
        members
    };
};
const getMyTeams = async (
    userId
) => {

    return await teamRepository
        .getMyTeams(userId);
};
const removeMember = async (
    teamId,
    captainId,
    memberId
) => {

    const team =
        await teamRepository
            .getTeamById(teamId);

    if (!team) {
        throw new Error(
            "Team not found"
        );
    }

    if (
        team.captain_id !== captainId
    ) {
        throw new Error(
            "Only captain can remove members"
        );
    }

    if (
        Number(memberId) ===
        team.captain_id
    ) {
        throw new Error(
            "Captain cannot be removed"
        );
    }

    await teamRepository
        .removeMember(
            teamId,
            memberId
        );
};
module.exports = {
    createTeam,
    addMember,
    getTeamById,
    getMyTeams,
    removeMember
};