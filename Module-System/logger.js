
// console.log(__dirname)
// console.log(__filename)

var url = "https://localhost:3000";

// function logger(message) {
//     console.log(message)
// }


// module.exports.loggingService = logger;
// module.exports.endpoint = url;
// // exports.loggingService = logger;
// // exports.endpoint = url;
// // module.exports = { logger, url }


// // console.log(module)

const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit("message1", {name: "message1", url});
    }
}

module.exports = Logger;