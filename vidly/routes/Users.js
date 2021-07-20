const _ = require("lodash"); // contains a lot of functions to work with arrays and objects
const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("config");


const {
    JoiUserValidation,
    mongooseUserSchema
} = require("../Models/UserModel");

const router = express.Router();


const UserModel = mongoose.model("user", mongooseUserSchema);


const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.



// register a User
router.post("/", asyncMiddleware(async (req, res) => {

    const {
        error
    } = JoiUserValidation(req.body);
    if (error) return res.status(400).send(error);

    let User = await UserModel.findOne({
        email: req.body.email
    });
    // let User = await UserModel.findOne({ email: req.body.email });
    if (User) return res.status(400).send("User already Register.");

    User = new UserModel({
        ...req.body
    })
    // User = new UserModel(_.pick(req.body, ["name","email","password", "isAdmin"]))

    // for hashing password
    const salt = await bcrypt.genSalt(10);
    User.password = await bcrypt.hash(User.password, salt);

    await User.save();
    // res.send(User);     // one way
    // res.send({          // second way
    //     name: User.name,
    //     email: User.email,
    // })

    // const token = jwt.sign({_id: User._id}, config.get("jwtPrivateKey"));
    const token = User.generateAuthToken();

    // in the following 'x-' is must for setting header. 
    res.header("x-auth-token", token).send(_.pick(User, ["_id", "name", "email"]))   // third way
}));



module.exports = router;