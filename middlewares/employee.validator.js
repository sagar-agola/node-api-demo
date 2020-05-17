const employeeModel = require('../schemas/employee');

// validation middleware
module.exports = (req, res, next) => {
    const employee = new employeeModel(req.body);

    const error = employee.validateSync();
    let errorResponse = {};

    // twik default error object to custom user friendly error object
    if (error) {
        if (error.errors.salary) {
            errorResponse.salary = error.errors.salary.message;
        }

        if (error.errors.name) {
            errorResponse.name = error.errors.name.message;
        }

        res.status(400).send(errorResponse);
    } else {
        req.employee = employee;
        next();
    }
}