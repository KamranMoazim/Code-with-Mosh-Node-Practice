// const _ = require("lodash"); // contains a lot of functions to work with arrays and objects
const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("config");

const {mongooseUserSchema} = require("../Models/UserModel");
const router = express.Router();
const auth = require("../middleware/auth");


const UserModel = mongoose.model("user", mongooseUserSchema)


const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.


// me route
router.get("/me", auth, asyncMiddleware(async (req, res) =>{
    const User = await UserModel.findById(req.user._id).select("-password");
    res.send(User);
}));



// authenticating a User
router.post("/", asyncMiddleware(async (req, res) => {

    const { error } = JoiAuthValidation(req.body);
    if (error) return res.status(400).send(error);

    let User = await UserModel.findOne({ email: req.body.email });
    if (!User) return res.status(400).send("Invalid Email or Password.");

    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if(!validPassword) return res.status(400).send("Invalid Email or Password.");

    // const token = jwt.sign({_id: User._id}, "jwtPrivateKey");
    // const token = jwt.sign({_id: User._id}, config.get("jwtPrivateKey"));
    const token = User.generateAuthToken();
    // export vidly_jwtPrivateKey=KamranJWTprivateKey
    // this is how you define environment variables.

    res.send(token);
}));


function JoiAuthValidation(auth) {
    const joiSchema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return joiSchema.validate(auth)
}


module.exports = router;