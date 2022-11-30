const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const TaskRoute = require('./routes/taskRoute')




app.use(bodyParser());
app.use("/v1/tasks", TaskRoute);




module.exports = app;