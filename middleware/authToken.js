const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        console.log("Authorization Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing. Please provide a token.",
                error: true,
                success: false
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Token is missing. Please provide a valid token.",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("JWT verification error:", err);
                return res.status(403).json({
                    message: "Invalid token. Authentication failed.",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded token:", decoded);
            req.userId = decoded?._id;

            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
