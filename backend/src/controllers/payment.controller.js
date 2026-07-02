const paymentService =
    require("../services/payment.service");

const createOrder =
async (
    req,
    res
) => {

    try {

        const order =
            await paymentService
                .createOrder(

                    req.user.id,

                    req.body
                );

        res.status(201).json({

            success:true,

            order
        });

    } catch (error) {

    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}

};

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

        res.status(200).json({

            success:true,

            result
        });

    } catch (error) {

        res.status(400).json({

            success:false,

            message:error.message
        });

    }

};

module.exports={

    createOrder,

    verifyPayment
};