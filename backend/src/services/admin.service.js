const adminRepository =
    require("../repositories/admin.repository");

const getDashboardStats = async () => {
    return await adminRepository.getDashboardStats();
};

const getAllUsers = async () => {
    return await adminRepository.getAllUsers();
};

const getAllTeams = async () => {
    return await adminRepository.getAllTeams();
};

const getAllBookings = async () => {
    return await adminRepository.getAllBookings();
};

const getRevenueAnalytics = async () => {
    return await adminRepository.getRevenueAnalytics();
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllTeams,
    getAllBookings,
    getRevenueAnalytics
};