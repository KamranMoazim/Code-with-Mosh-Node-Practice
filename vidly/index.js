// // const Joi = require("joi");
// // Joi.objectId = require("joi-objectid")(Joi);
// // require("express-async-errors");    // if this does not work you will have to use your manual middleware
// const express = require("express");
// const winston = require("winston");
// // const mongoose = require("mongoose");
// // const config = require("config");



// // if (!config.get("jwtPrivateKey")) {
// //     console.log("Fatal Error JWT Private Key is not defined.");
// //     process.exit(1);
// // }


// // mongoose.connect("mongodb://localhost:27017/vidly", {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true
// //     })
// //     .then(() => console.log("Connected to MongoDB..."))
// //     .catch((err) => console.log("Could not connect to MongoDB.", err))

// // mongoose.set('useNewUrlParser', true);
// // mongoose.set('useFindAndModify', false);
// // mongoose.set('useCreateIndex', true);

// // const winston = require("winston"); // for logging errors in console, file or sending to http

// const app = express();


// require("./start/configuration")();
// require("./start/routes")(app);
// require("./start/database")();
// require("./start/logging")();
// require("./start/validation")();


// // const genres = require("./routes/Genres");
// // const customers = require("./routes/Customers");
// // const movies = require("./routes/Movies");
// // const rentals = require("./routes/Rentals");
// // const users = require("./routes/Users");
// // const auth = require("./routes/Auth");


// // for handeling 'uncaughtException', 'unhandledRejection' because it will not be handled by our middleware so we handle such things manually
// // throw new Error("Uncaught Error occured.");
// // User-defined -------->
// // process.on("uncaughtException", (ex)=>{
// //     // console.log("We caught an uncaught Exception.");
// //     winston.error(ex.message, ex);
// //     process.exit(1);
// // })
// // using module -------->
// // new winston.ExceptionHandler(new winston.transports.File({ filename: "uncaughtExceptions.log" }));

// // // const p = new Promise.reject( new Error("Uncaught Rejection occured."));
// // // p.then(()=>console.log("Done"));
// // process.on("unhandledRejection", (ex)=>{
// //     // console.log("We caught an unhandled Rejection.");
// //     winston.error(ex.message, ex);
// //     process.exit(1);
// // })


// // // for logging errors in console, file or sending to http
// // winston.add(new winston.transports.File({ filename: 'logfile.log' }))
// // winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost:27017/vidly", level:"error" })) // if you set level, then you will only get that kind of error
// // Following are the levels
// // error
// // warn
// // info
// // verbose
// // debug
// // silly


// // const errHandle = require("./middleware/error"); // custom middleware for 

// // app.use(express.json());

// // app.use("/api/genres", genres)
// // app.use("/api/customers", customers)
// // app.use("/api/movies", movies)
// // app.use("/api/rentals", rentals)
// // app.use("/api/registerUser", users)
// // app.use("/api/authUser", auth)

// // app.use(errHandle);



// const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))
// app.listen(PORT, () => winston.info(`Listening on Port ${PORT}`))




const express = require("express");
const winston = require("winston");



const app = express();

require("./start/configuration")();
require("./start/routes")(app);
require("./start/database")();
require("./start/logging")();
require("./start/validation")();
require("./start/production")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => winston.info(`Listening on Port ${PORT}`))