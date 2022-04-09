const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./mongoose');
const { ErrorResponse } = require('./models/ErrorResponse');

const app = express();

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    // credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database status checking
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
        res.status(500).json(new ErrorResponse(-1, "Unable to connect to the database."));
        return;
    }
    // Continue processing other middlewares
    next();
})

// Routers
app.use("/api", require("./controllers/Order").router);

// 404 Error
app.use("/api/*", (req, res) => {
    res.status(404).json();
});

// Static resources
app.use(express.static(path.join(__dirname, "/frontend/build")));

module.exports = { app };