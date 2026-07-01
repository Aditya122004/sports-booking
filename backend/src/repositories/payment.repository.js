const pool =
    require("../config/db");

const bookingRepository =
    require("./booking.repository");

const createPayment = async (
    bookingId,
    amount,
    orderId
) => {

    const [result] =
        await pool.execute(
            `
            INSERT INTO payments
            (
                booking_id,
                razorpay_order_id,
                amount,
                status
            )
            VALUES
            (
                ?,
                ?,
                ?,
                'PENDING'
            )
            `,
            [
                bookingId,
                orderId,
                amount
            ]
        );

    return result.insertId;
};

const getPaymentByOrderId =
async (
    orderId
) => {

    const [rows] =
        await pool.execute(
            `
            SELECT *
            FROM payments
            WHERE razorpay_order_id = ?
            `,
            [orderId]
        );

    return rows[0];
};

const markPaymentSuccess =
async (
    paymentId,
    razorpayPaymentId,
    signature
) => {

    await pool.execute(
        `
        UPDATE payments
        SET

            razorpay_payment_id = ?,

            razorpay_signature = ?,

            status = 'SUCCESS',

            verified_at = NOW()

        WHERE id = ?
        `,
        [
            razorpayPaymentId,
            signature,
            paymentId
        ]
    );
};

const markBookingConfirmed =
async (
    bookingId
) => {

    await pool.execute(
        `
        UPDATE bookings
        SET

            booking_status='CONFIRMED',

            payment_status='SUCCESS'

        WHERE id=?
        `,
        [bookingId]
    );
};

module.exports = {

    createPayment,

    getPaymentByOrderId,

    markPaymentSuccess,

    markBookingConfirmed
};