const pool = require("../config/db");

const findConflictingBooking = async (
    facilityId,
    bookingDate,
    startTime,
    endTime,
    connection = pool
) => {

    const [rows] =
        await connection.execute(
            `
            SELECT id
            FROM bookings
            WHERE facility_id = ?
            AND booking_date = ?
            AND booking_status IN (
                'PENDING',
                'CONFIRMED'
            )
            AND start_time < ?
            AND end_time > ?
            LIMIT 1
            `,
            [
                facilityId,
                bookingDate,
                endTime,
                startTime
            ]
        );

    return rows[0];
};
const createBooking = async (
    booking,
    connection = pool
) => {

    const [result] =
        await connection.execute(
            `
           INSERT INTO bookings
(
    user_id,
    facility_id,
    booking_date,
    start_time,
    end_time,
    total_amount,
    booking_status,
    payment_status,
    expires_at
)
VALUES
(
    ?, ?, ?, ?, ?, ?,
    'PENDING',
    'PENDING',
    ?
)
            `,
            [
                booking.userId,
                booking.facilityId,
                booking.bookingDate,
                booking.startTime,
                booking.endTime,
                booking.totalAmount
            ]
        );

    return result.insertId;
};
const getUserBookings = async (
    userId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                b.*,
                f.name AS facility_name
            FROM bookings b
            JOIN facilities f
            ON f.id = b.facility_id
            WHERE b.user_id = ?
            ORDER BY b.booking_date DESC
            `,
            [userId]
        );

    return rows;
};
const findConflictingBookingForUpdate = async (
    facilityId,
    bookingDate,
    startTime,
    endTime,
    connection
) => {

    const [rows] =
        await connection.execute(
            `
            SELECT id
            FROM bookings
            WHERE facility_id = ?
            AND booking_date = ?

            AND booking_status IN (
                'PENDING',
                'CONFIRMED'
            )

            AND (
                expires_at IS NULL
                OR expires_at > NOW()
            )

            AND start_time < ?
            AND end_time > ?

            FOR UPDATE
            `,
            [
                facilityId,
                bookingDate,
                endTime,
                startTime
            ]
        );

    return rows[0];
};
module.exports={
    getUserBookings,
    createBooking,
    findConflictingBooking,
    findConflictingBookingForUpdate
};