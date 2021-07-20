const express = require("express");
// const Joi = require("joi");
const {
    mongoosGenreSchema,
    JoiGenreValidation
} = require("../Models/GenresModel");
const mongoose = require("mongoose");


const router = express.Router();
router.use(express.json());


const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const GenreModel = mongoose.model("Genre", mongoosGenreSchema)

const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.


// getting all Genres
router.get("/", asyncMiddleware(async (req, res) => {
    const Genres = await GenreModel.find().sort("name");
    res.send(Genres)
}));

// getting particular Genre
router.get("/:id", asyncMiddleware(async (req, res) => {

    let Genre = await GenreModel.findById(req.params.id)
    if (!Genre) return res.status(404).send("Movie with Given ID could Not Found.")
    res.send(Genre);

}));

// saving a Genre
// here you used middleware named ---> auth
router.post("/", auth, asyncMiddleware(async (req, res) => {
    const Genres = await GenreModel.find().sort("name");
    const result = JoiGenreValidation(req.body); // new version
    if (result.error) return res.status(400).send(result.error);
    const newGenre = Genres.filter(genre => genre.name === req.body.name.trim().toLowerCase())
    if (!newGenre.length) {
        let Genre = new GenreModel({
            name: req.body.name
        })

        Genre = await Genre.save();
        res.send(Genre);

    } else {
        res.send("Genre already exists.");
    }
}));



// updating a particular Genre
router.put("/:id", asyncMiddleware(async (req, res) => {
    // let result = joiSchema.validate(req.body);
    let result = JoiGenreValidation(req.body);
    if (result.error) return res.status(400).send(result.error);

    const Genre = await GenreModel.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        new: true
    })
    if (!Genre) return res.status(404).send("Movie with Given ID could Not Found.")
    res.send(Genre);

}));

// deleting a Genre
router.delete("/:id", [auth, admin], asyncMiddleware(async (req, res) => {

    const Genre = await GenreModel.deleteOne({
        _id: req.params.id
    });
    res.send(Genre)

}));

module.exports = router;