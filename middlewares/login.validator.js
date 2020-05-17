const loginSchema = require('../schemas/login');

// validation middleware
module.exports = (req, res, next) => {
    const loginModel = new loginSchema(req.body);

    const error = loginModel.validateSync();
    let errorResponse = {};

    // twik default error object to custom user friendly error object
    if (error) {
        if (error.errors.email) {
            errorResponse.Email = error.errors.email.message;
        }

        if (error.errors.password) {
            errorResponse.Password = error.errors.password.message;
        }

        res.status(400).send(errorResponse);
    } else {
        next();
    }
}