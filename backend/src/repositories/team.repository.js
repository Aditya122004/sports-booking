const pool = require("../config/db");

const createTeam = async (
    name,
    sportId,
    captainId
) => {

    const [result] = await pool.execute(
        `
        INSERT INTO teams
        (
            name,
            sport_id,
            captain_id
        )
        VALUES (?, ?, ?)
        `,
        [
            name,
            sportId,
            captainId
        ]
    );

    return result.insertId;
};

const addMember = async (
    teamId,
    userId
) => {

    await pool.execute(
        `
        INSERT INTO team_members
        (
            team_id,
            user_id
        )
        VALUES (?, ?)
        `,
        [teamId, userId]
    );
};

const getTeamById = async (
    teamId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                t.id,
                t.name,
                t.captain_id,

                s.id AS sport_id,
                s.name AS sport_name,

                u.name AS captain_name

            FROM teams t

            JOIN sports s
            ON s.id = t.sport_id

            JOIN users u
            ON u.id = t.captain_id

            WHERE t.id = ?
            `,
            [teamId]
        );

    return rows[0];
};

const getMyTeams = async (
    userId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT DISTINCT
                t.*
            FROM teams t
            LEFT JOIN team_members tm
            ON tm.team_id = t.id
            WHERE
                t.captain_id = ?
                OR tm.user_id = ?
            `,
            [userId, userId]
        );

    return rows;
};

const isMember = async (
    teamId,
    userId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT *
            FROM team_members
            WHERE team_id = ?
            AND user_id = ?
            `,
            [teamId, userId]
        );

    return rows.length > 0;
};

const removeMember = async (
    teamId,
    userId
) => {

    const [result] =
        await pool.execute(
            `
            DELETE FROM team_members
            WHERE team_id = ?
            AND user_id = ?
            `,
            [teamId, userId]
        );

    return result.affectedRows;
};

const getTeamMembers = async (
    teamId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                u.id,
                u.name,
                u.email,
                u.profile_picture
            FROM team_members tm
            JOIN users u
            ON u.id = tm.user_id
            WHERE tm.team_id = ?
            `,
            [teamId]
        );

    return rows;
};


module.exports = {
    createTeam,
    addMember,
    getTeamById,
    getMyTeams,
    isMember,
    removeMember,
    getTeamMembers,
    removeMember
};
