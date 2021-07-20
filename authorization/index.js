// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

const express = require("express");
const mongoose = require("mongoose");


const app = express();
// const genres = require("./routes/Genres");
// const customers = require("./routes/Customers");
// const movies = require("./routes/Movies");
// const rentals = require("./routes/Rentals");
const users = require("../vidly/routes/Users");
app.use(express.json());


// app.use("/api/genres", genres)
// app.use("/api/customers", customers)
// app.use("/api/movies", movies)
// app.use("/api/rentals", rentals)
app.use("/api/users", users)


mongoose.connect("mongodb://localhost:27017/playground", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB.", err))



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))