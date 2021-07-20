// const express = require("express");
const Joi = require("joi");
const joi_password_complexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const mongooseUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024    // this length is after hashing the password not orginal password
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

mongooseUserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
    return token
}


const complexityOptions = {
    min: 5,
    max: 24,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

function JoiUserValidation(user) {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // password: Joi.string().min(5).max(255).required(),
        password: joi_password_complexity(complexityOptions),
        isAdmin: Joi.boolean()
    })
    return joiSchema.validate(user)
}


exports.mongooseUserSchema = mongooseUserSchema;
module.exports.JoiUserValidation = JoiUserValidation;
// module.exports.UserModel = UserModel;
