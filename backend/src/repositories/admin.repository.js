const pool = require("../config/db");

const getDashboardStats = async () => {

    const [[users]] =
        await pool.execute(
            `
            SELECT COUNT(*) AS totalUsers
            FROM users
            `
        );

    const [[teams]] =
        await pool.execute(
            `
            SELECT COUNT(*) AS totalTeams
            FROM teams
            `
        );

    const [[facilities]] =
        await pool.execute(
            `
            SELECT COUNT(*) AS totalFacilities
            FROM facilities
            WHERE is_active = TRUE
            `
        );

    const [[bookings]] =
        await pool.execute(
            `
            SELECT COUNT(*) AS totalBookings
            FROM bookings
            WHERE booking_status = 'CONFIRMED'
            `
        );

    const [[revenue]] =
        await pool.execute(
            `
            SELECT
                IFNULL(SUM(total_amount),0)
                AS totalRevenue
            FROM bookings
            WHERE booking_status = 'CONFIRMED'
            `
        );

    return {
        totalUsers: users.totalUsers,
        totalTeams: teams.totalTeams,
        totalFacilities: facilities.totalFacilities,
        totalBookings: bookings.totalBookings,
        totalRevenue: revenue.totalRevenue
    };
};

const getAllUsers = async () => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                id,
                name,
                email,
                role,
                profile_picture,
                created_at
            FROM users
            ORDER BY created_at DESC
            `
        );

    return rows;
};

const getAllTeams = async () => {

    const [rows] =
        await pool.execute(
            `
            SELECT
                t.id,
                t.name,

                s.name AS sport,

                u.name AS captain,

                COUNT(tm.user_id) AS members

            FROM teams t

            JOIN sports s
            ON s.id = t.sport_id

            JOIN users u
            ON u.id = t.captain_id

            LEFT JOIN team_members tm
            ON tm.team_id = t.id

            GROUP BY t.id

            ORDER BY t.created_at DESC
            `
        );

    return rows;
};

const getAllBookings = async () => {

    const [rows] =
        await pool.execute(
            `
            SELECT
    b.id,
    u.name AS user,
    t.name AS team,
    f.name AS facility,
    b.booking_date,
    b.start_time,
    b.end_time,
    b.booking_status,
    b.payment_status,
    b.total_amount
FROM bookings b
JOIN users u
    ON u.id = b.user_id
JOIN facilities f
    ON f.id = b.facility_id
LEFT JOIN teams t
    ON t.id = b.team_id
ORDER BY
    b.booking_date DESC,
    b.start_time DESC;
            `
        );

    return rows;
};

const getRevenueAnalytics = async () => {

    const [[today]] =
        await pool.execute(
            `
            SELECT
                IFNULL(SUM(total_amount),0)
                AS revenue

            FROM bookings

            WHERE booking_status='CONFIRMED'

            AND booking_date = CURDATE()
            `
        );

    const [[month]] =
        await pool.execute(
            `
            SELECT
                IFNULL(SUM(total_amount),0)
                AS revenue

            FROM bookings

            WHERE booking_status='CONFIRMED'

            AND MONTH(booking_date)=MONTH(CURDATE())

            AND YEAR(booking_date)=YEAR(CURDATE())
            `
        );

    const [[year]] =
        await pool.execute(
            `
            SELECT
                IFNULL(SUM(total_amount),0)
                AS revenue

            FROM bookings

            WHERE booking_status='CONFIRMED'

            AND YEAR(booking_date)=YEAR(CURDATE())
            `
        );

    const [[total]] =
        await pool.execute(
            `
            SELECT
                IFNULL(SUM(total_amount),0)
                AS revenue

            FROM bookings

            WHERE booking_status='CONFIRMED'
            `
        );

    return {
        todayRevenue: today.revenue,
        monthlyRevenue: month.revenue,
        yearlyRevenue: year.revenue,
        totalRevenue: total.revenue
    };
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllTeams,
    getAllBookings,
    getRevenueAnalytics
};