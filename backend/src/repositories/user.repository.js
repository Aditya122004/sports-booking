const pool = require("../config/db");

const findByEmail = async (email) => {

    const [rows] = await pool.execute(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    return rows[0];
};

const createUser = async (userData) => {

    const {
        name,
        email,
        password,
        profilePicture,
        idProofType,
        idProofNumber
    } = userData;

    const [result] = await pool.execute(
        `
        INSERT INTO users
        (
            name,
            email,
            password,
            profile_picture,
            id_proof_type,
            id_proof_number
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            email,
            password,
            profilePicture,
            idProofType,
            idProofNumber
        ]
    );

    return result.insertId;
};

const findById = async (id) => {

    const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            email,
            profile_picture,
            role,
            created_at
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const getProfileById = async (
    userId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                name,
                email,
                profile_picture,
                id_proof_type,
                id_proof_number,
                role,
                created_at
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

    return rows[0];
};
const findUserByEmail =
async (email) => {

    const [rows] =
        await pool.execute(
            `
            SELECT *
            FROM users
            WHERE email = ?
            `,
            [email]
        );

    return rows[0];
};

module.exports = {
    findByEmail,
    createUser,
    findById,
    getProfileById,
    findUserByEmail
};