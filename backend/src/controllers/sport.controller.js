const sportService =
    require("../services/sport.service");

const createSport = async (req, res) => {

    try {

        const { name } = req.body;

        const sportId =
            await sportService.createSport(name);

        res.status(201).json({
            success: true,
            sportId
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllSports = async (req, res) => {

    try {

        const sports =
            await sportService.getAllSports();

        res.status(200).json({
            success: true,
            sports
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSportById = async (req, res) => {

    try {

        const sport =
            await sportService.getSportById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            sport
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const updateSport = async (req, res) => {

    try {

        await sportService.updateSport(
            req.params.id,
            req.body.name
        );

        res.status(200).json({
            success: true,
            message: "Sport updated"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteSport = async (req, res) => {

    try {

        await sportService.deleteSport(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Sport deleted"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createSport,
    getAllSports,
    getSportById,
    updateSport,
    deleteSport
};