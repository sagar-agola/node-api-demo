function nonEmptyArrayValidator(roles) {
    if (roles && roles.length === 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    NonEmptyArrayValidator: nonEmptyArrayValidator
}