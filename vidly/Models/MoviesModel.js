const Joi = require("joi");
const mongoose = require("mongoose");
const {mongoosGenreSchema} = require("./GenresModel");


const mongoosMovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    dailyRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 3000
    },
    genre: {
        type: mongoosGenreSchema,
        required: true
    }
})




function JoiMovieValidation(customer) {
    const joiSchema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        dailyRate: Joi.number().min(0).max(200).required(),
        numberInStock: Joi.number().min(0).max(3000).required(),
        genreId: Joi.string().required()
        // genre: JoiGenreSchema
    })
    return joiSchema.validate(customer)
}



// Both are same ways
exports.mongoosMovieSchema = mongoosMovieSchema;
module.exports.JoiMovieValidation = JoiMovieValidation;