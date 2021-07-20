const express = require("express");
const {
    mongoosMovieSchema,
    JoiMovieValidation
} = require("../Models/MoviesModel");
const {
    mongoosGenreSchema
} = require("../Models/GenresModel");
const mongoose = require("mongoose");


const router = express.Router();
router.use(express.json());


const MovieModel = mongoose.model("movie", mongoosMovieSchema);
const GenreModel = mongoose.model("genre", mongoosGenreSchema);


const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.


// getting all Movies
router.get("/", asyncMiddleware(async (req, res) => {

    // throw new Error("Uncaught error occured.");

    const Movies = await MovieModel.find().sort("title");
    res.send(Movies)

}));

// getting particular Movie
router.get("/:id", asyncMiddleware(async (req, res) => {

    let Movie = await MovieModel.findById(req.params.id)
    if (!Movie) return res.status(404).send("Movie with Given ID could Not Found.")
    res.send(Movie);

}));

// saving a Movie
router.post("/", asyncMiddleware(async (req, res) => {
    const result = JoiMovieValidation(req.body);
    if (result.error) return res.status(400).send(result.error);
    const genre = await GenreModel.findById(req.body.genreId)
    if (!genre) return res.status(404).send("Invalid Genre ID.");
    let Movie = new MovieModel({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRate: req.body.dailyRate,
        genre: {
            _id: req.body.genreId,
            name: genre.name
            // here you can add more properies to show
        },
    })

    Movie = await Movie.save();
    res.send(Movie);

}));

// updating a particular Movie
router.put("/:id", asyncMiddleware(async (req, res) => {
    let result = JoiMovieValidation(req.body);
    if (result.error) return res.status(400).send(result.error);

    const Movie = await MovieModel.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        new: true
    })
    if (!Movie) return res.status(404).send("Movie with Given ID could Not Found.")
    res.send(Movie);

}));

// deleting a Movie
router.delete("/:id", asyncMiddleware(async (req, res) => {

    const Movie = await MovieModel.deleteOne({
        _id: req.params.id
    });
    res.send(Movie)

}));

module.exports = router;