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
            teamId = null,
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

        if (
            Number(duration) >
            facility.max_booking_hours
        ) {
            throw new Error(
                "Duration exceeds allowed limit"
            );
        }

        const formattedStartTime =
            startTime.length === 5
                ? `${startTime}:00`
                : startTime;

        const startHour =
            Number(
                formattedStartTime
                    .split(":")[0]
            );

        const openingHour =
            Number(
                facility.opening_time
                    .split(":")[0]
            );

        const closingHour =
            Number(
                facility.closing_time
                    .split(":")[0]
            );

        if (
            startHour < openingHour
        ) {
            throw new Error(
                "Booking before opening time"
            );
        }

        const endHour =
            startHour +
            Number(duration);

        if (
            endHour > closingHour
        ) {
            throw new Error(
                "Booking exceeds facility closing time"
            );
        }

        const endTime =
            `${String(endHour)
                .padStart(2, "0")}:00:00`;

        const conflictingBooking =
            await bookingRepository
                .findConflictingBookingForUpdate(
                    facilityId,
                    bookingDate,
                    formattedStartTime,
                    endTime,
                    connection
                );

        if (
            conflictingBooking
        ) {
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
                        teamId,
                        bookingDate,
                        startTime:
                            formattedStartTime,
                        endTime,
                        totalAmount,
                        expiresAt
                    },
                    connection
                );

        await connection.commit();

        return {
            bookingId,
            totalAmount,
            expiresAt
        };

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();
    }
};

module.exports = {
    createBooking
};