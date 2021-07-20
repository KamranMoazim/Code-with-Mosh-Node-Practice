const express = require("express");

const genres = require("../routes/Genres");
const customers = require("../routes/Customers");
const movies = require("../routes/Movies");
const rentals = require("../routes/Rentals");
const users = require("../routes/Users");
const auth = require("../routes/Auth");

const errHandle = require("../middleware/error");

module.exports = function (app) {
    app.use(express.json());

    app.use("/api/genres", genres)
    app.use("/api/customers", customers)
    app.use("/api/movies", movies)
    app.use("/api/rentals", rentals)
    app.use("/api/registerUser", users)
    app.use("/api/authUser", auth)

    app.use(errHandle);
}