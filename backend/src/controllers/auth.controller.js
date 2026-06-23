const authService =
    require("../services/auth.service");

const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");

const register = async (
    req,
    res
) => {

    try {

        const data =
            registerSchema.parse(
                req.body
            );

        const result =
            await authService.register(
                data,
                req.file
            );

        res.status(201).json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (
    req,
    res
) => {

    try {

        const data =
            loginSchema.parse(
                req.body
            );

        const result =
            await authService.login(
                data.email,
                data.password
            );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getProfile =
async (
    req,
    res
) => {

    try {

        const user =
            await authService
                .getProfile(
                    req.user.id
                );

        return res.status(200)
            .json({
                success: true,
                user
            });

    } catch (error) {

        return res.status(400)
            .json({
                success: false,
                message:
                    error.message
            });
    }
};

module.exports = {
    register,
    login,
    getProfile
};