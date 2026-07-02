const facilityService =
    require("../services/facility.service");
const createFacility =
async (
    req,
    res
) => {

    try {

        const facilityId =
            await facilityService
                .createFacility(
                    req.body,
                    req.file
                );

        res.status(201).json({
            success: true,
            facilityId
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message:
                error.message
        });
    }
};
const getFacilities =
async (
    req,
    res
) => {

    try {

        const facilities =
            await facilityService
                .getFacilities(
                    req.query.sportId
                );

        res.status(200).json({
            success: true,
            facilities
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
};
const getFacilityById =
async (
    req,
    res
) => {

    try {

        const facility =
            await facilityService
                .getFacilityById(
                    req.params.id
                );

        res.status(200).json({
            success: true,
            facility
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message:
                error.message
        });
    }
};
const getAvailability =
async (
    req,
    res
) => {

    try {

        const slots =
            await facilityService
                .getAvailability(
                    req.params.id,
                    req.query.date
                );

        res.status(200).json({
            success: true,
            slots
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message:
                error.message
        });
    }
};
module.exports={
    getFacilities,
    getFacilityById,
    createFacility,
    getAvailability
};
