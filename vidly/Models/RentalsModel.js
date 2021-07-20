// Notive we added joi-objectid for objectId validation to Joi
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


const mongoose = require("mongoose");



const mongoosRentalSchema = mongoose.Schema({
    customer: { // here we are not using original schema BECAUSE there can be thousands of properties in original schema we dont want all properties.  
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
                trim: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 11,
                maxlength: 13,
                trim: true
            },
        }),
        required: true
    },
    movie: { // here we are not using original schema BECAUSE there can be thousands of properties in original schema we dont want all properties.  
        type: mongoose.Schema({
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
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now,
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})



function JoiRentalValidation(rental) {
    const joiSchema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    })
    return joiSchema.validate(rental)
}


// Both are same ways
exports.mongoosRentalSchema = mongoosRentalSchema;
module.exports.JoiRentalValidation = JoiRentalValidation;