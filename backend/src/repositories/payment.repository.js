const pool = require("../config/db");

const createPayment = async (
    bookingId,
    orderId,
    amount
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
                ?, ?, ?, 'PENDING'
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
const markPaymentSuccess = async (
    paymentId,
    razorpayPaymentId,
    razorpaySignature
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
            razorpaySignature,
            paymentId
        ]
    );
};
const getPaymentByOrderId = async (
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
const confirmBooking = async (
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
module.exports={
    confirmBooking,
    getPaymentByOrderId,
    markPaymentSuccess,
    createPayment
};