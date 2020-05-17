const jwt = require('jsonwebtoken');

module.exports = (allowedRoles) => {
    return (req, res, next) => {

        // extract token from header
        const token = req.header('Authorization');

        // Unauthorized: token not found
        if (!token) {
            res.status(401).send("Unauthorized");
        } else {
            // decode token
            jwt.verify(token, "My super secret key", (err, decoded) => {
                if (err) {
                    // invalid token
                    res.status(401).send("Unauthorized");
                } else {
                    // verify roles if specified
                    let isAuthorized = false;
                    if (allowedRoles.length !== 0) {
                        allowedRoles.forEach(role => {
                            decoded.roles.forEach(userRole => {
                                if (userRole === role) {
                                    isAuthorized = true;
                                }
                            });
                        });

                        if (isAuthorized) {
                            next();
                        } else {
                            // Forbidden: access denied
                            res.status(403).send("Forbidden");
                        }
                    } else {
                        // did not specified role so access granted
                        next();
                    }
                }
            });
        }
    };
}