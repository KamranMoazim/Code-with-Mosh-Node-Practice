const Joi = require("joi");
const mongoose = require("mongoose");



const mongoosGenreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // enum: ["comedy", "action", "thrill", "classic"],
        lowercase: true,
        trim: true,
        // unique: true
    }
})



function JoiGenreValidation(genre) {
    const joiSchema = Joi.object({
        // name: Joi.any().allow("comedy", "action", "thrill", "classic").only()
        name: Joi.string().required().min(6)
    })
    return joiSchema.validate(genre)
}


// Both are same ways
exports.mongoosGenreSchema = mongoosGenreSchema;
module.exports.JoiGenreValidation = JoiGenreValidation;
