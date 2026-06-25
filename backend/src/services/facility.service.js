const uploadToCloudinary =
    require("../utils/cloudinaryUpload");

const facilityRepository =
    require("../repositories/facility.repository");

const createFacility = async (
    body,
    image
) => {

    let imageUrl = null;

    if (image) {

        imageUrl =
            await uploadToCloudinary(
                image.buffer,
                "sports-booking/facilities"
            );
    }

    const facilityId =
        await facilityRepository
            .createFacility({
                ...body,
                imageUrl
            });

    return facilityId;
};
const getFacilities = async (
    sportId
) => {

    return await facilityRepository
        .getFacilities(
            sportId
        );
};
const getFacilityById = async (
    facilityId
) => {

    const facility =
        await facilityRepository
            .getFacilityById(
                facilityId
            );

    if (!facility) {
        throw new Error(
            "Facility not found"
        );
    }

    return facility;
};
const getAvailability = async (
    facilityId,
    date
) => {

    const facility =
        await facilityRepository
            .getFacilityById(
                facilityId
            );

    if (!facility) {
        throw new Error(
            "Facility not found"
        );
    }

    const bookings =
        await facilityRepository
            .getFacilityBookings(
                facilityId,
                date
            );

    const slots = [];

    let current =
        Number(
            facility.opening_time
                .split(":")[0]
        );

    const closing =
        Number(
            facility.closing_time
                .split(":")[0]
        );

    while (
        current < closing
    ) {

        const slotStart =
            `${String(current)
                .padStart(2, "0")}:00:00`;

        const slotEnd =
            `${String(current + 1)
                .padStart(2, "0")}:00:00`;

        let available = true;

        for (
            const booking
            of bookings
        ) {

            if (
                slotStart <
                    booking.end_time &&
                slotEnd >
                    booking.start_time
            ) {
                available = false;
                break;
            }
        }

        slots.push({
            startTime:
                slotStart,
            endTime:
                slotEnd,
            available
        });

        current++;
    }

    return slots;
};
module.exports={
    getFacilities,
    getFacilityById,
    createFacility,
    getAvailability
};