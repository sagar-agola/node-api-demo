const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const employeeApi = require('./employee/employee.api');
const userApi = require('./user/user.api');

const app = express();

// json middleware
app.use(express.json());

// connect to mongodb atlas
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.get('/api', (req, res) => {
    res.send("node js api is up n running...");
});

app.use('/api', employeeApi);
app.use('/api', userApi);

app.listen(config.PORT, () => {
    console.log(`server is listening on ${config.PORT}`);
});