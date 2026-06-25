const pool =
    require("../config/db");

const bookingRepository =
    require("../repositories/booking.repository");

const facilityRepository =
    require("../repositories/facility.repository");

const createBooking = async (
    userId,
    body
) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {
            facilityId,
            bookingDate,
            startTime,
            duration
        } = body;

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

        const startHour =
            Number(
                startTime.split(":")[0]
            );

        const endHour =
            startHour +
            Number(duration);

        const endTime =
            `${String(endHour)
                .padStart(2, "0")}:00:00`;

        const conflictingBooking =
            await bookingRepository
                .findConflictingBookingForUpdate(
                    facilityId,
                    bookingDate,
                    `${startTime}:00`,
                    endTime,
                    connection
                );

        if (conflictingBooking) {

            throw new Error(
                "Slot already booked"
            );
        }

        const totalAmount =
            Number(duration) *
            Number(
                facility.price_per_hour
            );

        const expiresAt =
            new Date(
                Date.now() +
                15 * 60 * 1000
            );

        const bookingId =
            await bookingRepository
                .createBooking(
                    {
                        userId,
                        facilityId,
                        bookingDate,

                        startTime:
                            `${startTime}:00`,

                        endTime,

                        totalAmount,

                        expiresAt
                    },
                    connection
                );

        await connection.commit();

        return {
            bookingId,
            totalAmount
        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();
    }
};
module.exports={
    createBooking
};
