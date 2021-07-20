const Joi = require("joi");
const mongoose = require("mongoose");



const mongoosCustomerSchema = mongoose.Schema({
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
})




function JoiCustomerValidation(customer) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11).max(13).required(),
    })
    return joiSchema.validate(customer)
}



// Both are same ways
exports.mongoosCustomerSchema = mongoosCustomerSchema;
module.exports.JoiCustomerValidation = JoiCustomerValidation;