const mongoose = require("mongoose");
const { config } = require("./config");

console.log("Connecting to database...");
mongoose.connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected.");
}).catch(e => {
    console.log("Cannot connect to database.", err);
});

module.exports = { mongoose };