const express = require("express");
const app = express();

const Joi = require("joi");


// BECAREFUL while using MIDDLEWARES because it SLOWS DOWN the processing.
// Built-in Middlewares   // 1*********************
app.use(express.json());
app.use(express.urlencoded({extended: true}));      // to get data in encoded-FORM-format
app.use(express.static("public"));                  // to store static file like css or other

// // Third Party Middlewares   // 2*********************
// // Go to expressJs.com and look for 3rd party middlewares
// const helmet = require("helmet");
const morgan = require("morgan");
// app.use(helmet())
// app.use(morgan("combined"))

// // Custom Middlewares   // 3*********************
// // const logger = require("./middlewares/Logger");
// // Logging Service
// app.use(logger)
// // Authenticating
// app.use((req,res,next)=>{
//     console.log("Authenticating....");
//     next();
// })


// Environment Variable
// console.log(`NODE_ENV : ${process.env.NODE_ENV}`)
// console.log(`app : ${app.get("env")}`)
// if (app.get("env") === "development") {
    // app.use(morgan("tiny"))
// }

// Configuration
// const config = require("config");
// console.log(`Application Name : ${name}`);
// console.log(`Mail Server : ${mail.host}`);
// // set Environment variable with this command ====> export app_passsword
// console.log(`Mail Server : ${mail.password}`);

// Debugging
// export DEBUG=app:startup
// export DEBUG=app:db
// export DEBUG=app:*
const startupDebugger = require("debug")('app:startup')
const dbDebugger = require("debug")('app:db')
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgan Enabled......")
}


// Database work
dbDebugger("Connected to Database....")



app.set("view engine", "pug");
app.set("views", "./views")

app.get("/", (req, res) => {
    // res.send("Heelo");
    res.render("index",{title:"Hello App", message:"This is message for you."})
})


const courses = require("./routes/courses");
app.use("/api/courses", courses)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))