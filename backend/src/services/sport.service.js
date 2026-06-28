const sportRepository =
    require("../repositories/sport.repository");

const createSport = async (name) => {

    return await sportRepository.createSport(name);
};

const getAllSports = async () => {

    return await sportRepository.getAllSports();
};

const getSportById = async (id) => {

    const sport =
        await sportRepository.getSportById(id);

    if (!sport) {
        throw new Error("Sport not found");
    }

    return sport;
};

const updateSport = async (id, name) => {

    const affectedRows =
        await sportRepository.updateSport(id, name);

    if (!affectedRows) {
        throw new Error("Sport not found");
    }
};

const deleteSport = async (id) => {

    const affectedRows =
        await sportRepository.deleteSport(id);

    if (!affectedRows) {
        throw new Error("Sport not found");
    }
};

module.exports = {
    createSport,
    getAllSports,
    getSportById,
    updateSport,
    deleteSport
};