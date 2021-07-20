// to get rid of error handling

const winston = require("winston"); // for logging errors in console, file or sending to http


module.exports = function (err, req, res, next) {
    // Logging errors
    winston.error(err.message, err)

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send("Something failed.");
}