const pool = require("../config/db");

const createSport = async (name) => {

    const [result] = await pool.execute(
        `
        INSERT INTO sports(name)
        VALUES(?)
        `,
        [name]
    );

    return result.insertId;
};

const getAllSports = async () => {

    const [rows] = await pool.execute(
        `
        SELECT *
        FROM sports
        ORDER BY name
        `
    );

    return rows;
};

const getSportById = async (id) => {

    const [rows] = await pool.execute(
        `
        SELECT *
        FROM sports
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

const updateSport = async (id, name) => {

    const [result] = await pool.execute(
        `
        UPDATE sports
        SET name = ?
        WHERE id = ?
        `,
        [name, id]
    );

    return result.affectedRows;
};

const deleteSport = async (id) => {

    const [result] = await pool.execute(
        `
        DELETE FROM sports
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    createSport,
    getAllSports,
    getSportById,
    updateSport,
    deleteSport
};