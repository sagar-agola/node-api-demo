const userSchema = require('../schemas/user');

// validation middleware
module.exports = (req, res, next) => {
    const user = new userSchema(req.body);

    const error = user.validateSync();
    let errorResponse = {};

    // twik default error object to custom user friendly error object
    if (error) {
        if (error.errors['name.firstname']) {
            errorResponse.FirstName = error.errors['name.firstname'].message;
        }

        if (error.errors['name.lastname']) {
            errorResponse.lastName = error.errors['name.lastname'].message;
        }

        if (error.errors.email) {
            errorResponse.Email = error.errors.email.message;
        }

        if (error.errors.password) {
            errorResponse.Password = error.errors.password.message;
        }

        if (error.errors.roles) {
            errorResponse.Roles = error.errors.roles.message;
        }

        res.status(400).send(errorResponse);
    } else {
        next();
    }
}