const express = require('express');
const jwt = require('jsonwebtoken');

const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/employee.validator');
const idParser = require('../middlewares/mongoDbIdParser');

const employeeSchema = require('../schemas/employee');

const app = express();

// GET: api/employees
app.get('/employees', (req, res) => {
    employeeSchema.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }

        res.send(data);
    });
});

// GET: api/employees/:id
app.get('/employees/:id', idParser, authorize(['employee', 'admin']), (req, res) => {
    employeeSchema.findById(req.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else if (!data) {
            res.status(404).send(`Employee with Id: ${req.id} not found.`);
        } else {
            res.status(200).send(data);
        }
    });
});

// POST: api/employees
app.post('/employees', validate, authorize(['admin']), (req, res) => {
    employeeSchema.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// PUT: api/employees/:id
app.put('/employees/:id', validate, idParser, authorize(['admin']), (req, res) => {
    employeeSchema.findByIdAndUpdate(req.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else if (!data) {
            res.status(404).send(`Employee with Id: ${req.id} not found.`);
        } else {
            res.status(200).send(req.employee);
        }
    });
});

// DELETE: api/employees/:id
app.delete('/employees/:id', idParser, authorize(['admin']), (req, res) => {
    employeeSchema.findByIdAndDelete(req.id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else if (!data) {
            res.status(404).send(`Employee with Id: ${req.id} not found.`);
        } else {
            res.status(200).send(data);
        }
    });
});

module.exports = app;