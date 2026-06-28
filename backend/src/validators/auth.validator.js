const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(3).max(100),

    email: z.email(),

    password: z.string().min(6),

    idProofType: z.enum([
        "AADHAAR",
        "PAN",
        "PASSPORT",
        "DRIVING_LICENSE",
        "VOTER_ID"
    ]),

    idProofNumber: z.string().min(3)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

module.exports = {
    registerSchema,
    loginSchema
};