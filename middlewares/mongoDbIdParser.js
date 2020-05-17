const mongoose = require('mongoose');

// Id parse middleware
module.exports = (req, res, next) => {
    // check if request has id parameter
    if (req.params.id) {
        // check if valid mongodb ObjectId type
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!isValidId) {
            res.status(400).send('Invalid employee id');
        } else {
            // if valid type, then parse into mongodb ObjectId type and continue on request response pipeline
            req.id = mongoose.Types.ObjectId(req.params.id);
            next();
        }
    } else {
        res.status(500).send("Id not provided");
    }
}