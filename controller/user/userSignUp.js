const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide an email",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide a password",
                error: true,
                success: false,
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "Please provide a name",
                error: true,
                success: false,
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
                error: true,
                success: false,
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (!hashPassword) {
            return res.status(500).json({
                message: "Error occurred while hashing password",
                error: true,
                success: false,
            });
        }

        const payload = {
            email,
            name,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const savedUser = await userData.save();

        // Remove password from the response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            data: userResponse,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        console.error('Sign up error:', err);
        res.status(500).json({
            message: "An unexpected error occurred. Please try again later.",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;