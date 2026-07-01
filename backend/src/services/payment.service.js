const crypto =
    require("crypto");

const razorpay =
    require("../config/razorpay");

const paymentRepository =
    require("../repositories/payment.repository");

const createOrder =
async (
    userId,
    body
) => {

    const {
        bookingId,
        amount
    } = body;

    const order =
        await razorpay.orders.create({

            amount:
                amount * 100,

            currency:
                "INR",

            receipt:
                `booking_${bookingId}`

        });

    await paymentRepository
        .createPayment(

            bookingId,

            amount,

            order.id
        );

    return order;
};

const verifyPayment =
async (
    body
) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    } = body;

    const generatedSignature =
        crypto
            .createHmac(

                "sha256",

                process.env
                    .RAZORPAY_KEY_SECRET
            )

            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )

            .digest("hex");

    if (
        generatedSignature !==
        razorpay_signature
    ) {

        throw new Error(
            "Invalid payment signature"
        );
    }

    const payment =
        await paymentRepository
            .getPaymentByOrderId(
                razorpay_order_id
            );

    if (!payment) {

        throw new Error(
            "Payment not found"
        );
    }

    await paymentRepository
        .markPaymentSuccess(

            payment.id,

            razorpay_payment_id,

            razorpay_signature
        );

    await paymentRepository
        .markBookingConfirmed(
            payment.booking_id
        );

    return {
        message:
            "Payment Verified Successfully"
    };
};

module.exports = {

    createOrder,

    verifyPayment
};