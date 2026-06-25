const pool = require("../config/db");

const createFacility = async (facility) => {

    const {
        name,
        sportId,
        description,
        location,
        openingTime,
        closingTime,
        pricePerHour,
        imageUrl,
        maxBookingHours
    } = facility;

    const [result] =
        await pool.execute(
            `
            INSERT INTO facilities
            (
                name,
                sport_id,
                description,
                location,
                opening_time,
                closing_time,
                price_per_hour,
                image_url,
                max_booking_hours
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                name,
                sportId,
                description,
                location,
                openingTime,
                closingTime,
                pricePerHour,
                imageUrl,
                maxBookingHours
            ]
        );

    return result.insertId;
};
const getFacilities = async (
    sportId
) => {

    let query = `
        SELECT
            f.*,
            s.name AS sport_name
        FROM facilities f
        JOIN sports s
        ON s.id = f.sport_id
        WHERE f.is_active = TRUE
    `;

    let params = [];

    if (sportId) {

        query += `
            AND f.sport_id = ?
        `;

        params.push(sportId);
    }

    const [rows] =
        await pool.execute(
            query,
            params
        );

    return rows;
};
const getFacilityById = async (
    facilityId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                f.*,
                s.name AS sport_name
            FROM facilities f
            JOIN sports s
            ON s.id = f.sport_id
            WHERE f.id = ?
            `,
            [facilityId]
        );

    return rows[0];
};
const getFacilityBookings = async (
    facilityId,
    date
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                start_time,
                end_time
            FROM bookings
            WHERE facility_id = ?
            AND booking_date = ?
            AND booking_status = 'CONFIRMED'
            `,
            [
                facilityId,
                date
            ]
        );

    return rows;
};
module.exports={
    getFacilities,
    getFacilityById,
    createFacility,
    getFacilityBookings
}