const express = require('express');
const jwt = require('jsonwebtoken');

const userSchema = require('../schemas/user');
const vaildateUserSchema = require('../middlewares/user.validator');
const vaidateLoginSchema = require('../middlewares/login.validator');

const app = express();

// POST: api/register
app.post('/register', vaildateUserSchema, (req, res) => {
    userSchema.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// POST: api/login
app.post('/login', vaidateLoginSchema, (req, res) => {

    const filterObject = {
        email: req.body.email,
        password: req.body.password
    };

    userSchema.findOne(filterObject, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else if (!data) {
            res.status(401).send("Unauthorized");
        } else {
            const payload = {
                email: data.email,
                userId: data._id,
                roles: data.roles
            };
            const token = jwt.sign(payload, "My super secret key");

            res.status(200).send({ token, data });
        }
    });
});

module.exports = app;