const bookingService =
    require("../services/booking.service");

const createBooking =
async (
    req,
    res
) => {

    try {

        const booking =
            await bookingService
                .createBooking(
                    req.user.id,
                    req.body
                );

        res.status(201).json({
            success: true,
            booking
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message:
                error.message
        });
    }
};
const getMyBookings =
async (
    req,
    res
) => {

    try {

        const bookings =
            await bookingRepository
                .getUserBookings(
                    req.user.id
                );

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
};
module.exports={
    getMyBookings,
    createBooking
};