const paymentService =
    require("../services/payment.service");

const verifyPayment =
async (
    req,
    res
) => {

    try {

        const result =
            await paymentService
                .verifyPayment(
                    req.body
                );

        res.status(200).json(
            result
        );

    } catch (error) {

        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
module.exports={
    verifyPayment
};