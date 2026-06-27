const adminService =
    require("../services/admin.service");

const getDashboardStats = async (
    req,
    res
) => {

    try {

        const stats =
            await adminService
                .getDashboardStats();

        res.status(200).json({
            success: true,
            stats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllUsers = async (
    req,
    res
) => {

    try {

        const users =
            await adminService
                .getAllUsers();

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllTeams = async (
    req,
    res
) => {

    try {

        const teams =
            await adminService
                .getAllTeams();

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

const getAllBookings = async (
    req,
    res
) => {

    try {

        const bookings =
            await adminService
                .getAllBookings();

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRevenueAnalytics = async (
    req,
    res
) => {

    try {

        const revenue =
            await adminService
                .getRevenueAnalytics();

        res.status(200).json({
            success: true,
            revenue
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllTeams,
    getAllBookings,
    getRevenueAnalytics
};