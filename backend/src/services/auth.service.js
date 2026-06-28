const bcrypt = require("bcryptjs");

const uploadToCloudinary =
    require("../utils/cloudinaryUpload");

const userRepository =
    require("../repositories/user.repository");

const generateToken =
    require("../utils/jwt");

const register = async (
    body,
    profilePicture
) => {

    const existingUser =
        await userRepository.findByEmail(
            body.email
        );

    if (existingUser) {
        throw new Error(
            "Email already registered"
        );
    }

    let profilePictureUrl = null;

    if (profilePicture) {

        profilePictureUrl =
            await uploadToCloudinary(
                profilePicture.buffer,
                "sports-booking/users"
            );
    }

    const hashedPassword =
        await bcrypt.hash(
            body.password,
            10
        );

    const userId =
        await userRepository.createUser({
            ...body,
            password: hashedPassword,
            profilePicture:
                profilePictureUrl
        });

    const user =
        await userRepository.findById(
            userId
        );

    const token =
        generateToken({
            id: user.id,
            role: user.role
        });

    return {
        user,
        token
    };
};

const login = async (
    email,
    password
) => {

    const user =
        await userRepository.findByEmail(
            email
        );

    if (!user) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const token =
        generateToken({
            id: user.id,
            role: user.role
        });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const getProfile =
async (userId) => {

    const user =
        await userRepository
            .getProfileById(
                userId
            );

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return user;
};

module.exports = {
    register,
    login,
    getProfile
};