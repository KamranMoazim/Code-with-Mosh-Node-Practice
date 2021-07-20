const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
    mongoose.connect("mongodb://localhost:27017/vidly", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to MongoDB..."))
    // .catch((err) => console.log("Could not connect to MongoDB.", err))   // as it is being handled in exception portion

    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}