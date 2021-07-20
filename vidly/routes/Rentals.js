const express = require("express");
const {
    mongoosRentalSchema,
    JoiRentalValidation
} = require("../Models/RentalsModel");
const {
    mongoosCustomerSchema
} = require("../Models/CustomersModel");
const {
    mongoosMovieSchema
} = require("../Models/MoviesModel");
const mongoose = require("mongoose");

// for making both action completed else no action completed  ---> Transaction Concept
const Fawn = require("fawn");
Fawn.init(mongoose);


const router = express.Router();
router.use(express.json());


const RentalModel = mongoose.model("rental", mongoosRentalSchema);
const MovieModel = mongoose.model("movie", mongoosMovieSchema);
const CustomerModel = mongoose.model("customer", mongoosCustomerSchema);


const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.


// getting all Rentals
router.get("/", asyncMiddleware(async (req, res) => {

    const Rentals = await RentalModel.find().sort("dateOut");
    res.send(Rentals)

}));

// getting particular Rental
router.get("/:id", asyncMiddleware(async (req, res) => {

    let Rental = await RentalModel.findById(req.params.id)
    if (!Rental) return res.status(404).send("Rental with Given ID could Not Found.")
    res.send(Rental);

}));

// saving a Rental
router.post("/", asyncMiddleware(async (req, res) => {
    const result = JoiRentalValidation(req.body);
    if (result.error) return res.status(400).send(result.error);

    // Following Logic should be done in this function -----> JoiRentalValidation()
    // if (mongoose.Types.ObjectId.isValid(req.body.movieId)) return res.status(400).send("Invalid Movie Id");
    // if (mongoose.Types.ObjectId.isValid(req.body.customerId)) return res.status(400).send("Invalid Customer Id");

    const movie = await MovieModel.findById(req.body.movieId)
    if (!movie) return res.status(404).send("Movie with given Id not Found.");

    if (movie.numberInStock === 0) return res.status(404).send("Movie is currently out of Stock.");

    const customer = await CustomerModel.findById(req.body.customerId)
    if (!customer) return res.status(404).send("Customer with given Id not Found.");


    let Rental = new RentalModel({
        // genre: {
        //     _id: req.body.genreId,
        //     name: genre.name
        //     // here you can add more properies to show
        // },
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRate: movie.dailyRate
        }
    })


    // Rental = await Rental.save();
    // // because movie stock should descrease by one every time it is rentled
    // movie.numberInStock--; 
    // await movie.save(); 

    new Fawn.Task()
        .save("rentals", Rental)
        .update("movies", {
            _id: movie._id
        }, {
            $inc: {
                numberInStock: -1
            }
        })
        // .remove()    // other operations you wants to perform
        .run()

    res.send(Rental);


}));

// updating a particular Rental
router.put("/:id", asyncMiddleware(async (req, res) => {
    let result = JoiRentalValidation(req.body);
    if (result.error) return res.status(400).send(result.error);

    const Rental = await RentalModel.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        new: true
    })
    if (!Rental) return res.status(404).send("Rental with Given ID could Not Found.")
    res.send(Rental);

}));

// deleting a Rental
router.delete("/:id", asyncMiddleware(async (req, res) => {

    const Rental = await RentalModel.deleteOne({
        _id: req.params.id
    });
    res.send(Rental)

}));

module.exports = router;