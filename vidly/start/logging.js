const winston = require("winston"); 

module.exports = function () {
    // new winston.transports.Console({ colorize:true, prettyPrint: true });   // this is for new dev because in for new dev he must not have set ----> jwtSecretKey
    new winston.ExceptionHandler(new winston.transports.File({ filename: "uncaughtExceptions.log" }));
    process.on("unhandledRejection", (ex)=>{
        winston.error(ex.message, ex);
        process.exit(1);
    })
    winston.add(new winston.transports.File({ filename: 'logfile.log' }))
}