const express = require("express");
const { mongoosCustomerSchema, JoiCustomerValidation } = require("../Models/CustomersModel");
const mongoose = require("mongoose");


const router = express.Router();
router.use(express.json());


const CustomerModel = mongoose.model("customer", mongoosCustomerSchema);


const asyncMiddleware = require("../middleware/async"); // for making try catch blocks.


// getting all Customers
router.get("/", asyncMiddleware(async (req, res) => {

    const Customers = await CustomerModel.find().sort("name");
    res.send(Customers)

}));

// getting particular Customer
router.get("/:id", asyncMiddleware(async (req, res) => {

    let Customer = await CustomerModel.findById(req.params.id)
    if (!Customer) return res.status(404).send("Customer with Given ID could Not Found.")
    res.send(Customer);

}));

// saving a Customer
router.post("/", asyncMiddleware(async (req, res) => {
    const result = JoiCustomerValidation(req.body);
    if (result.error) return res.status(400).send(result.error);
    let Customer = new CustomerModel({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    Customer = await Customer.save();
    res.send(Customer);

}));

// updating a particular Customer
router.put("/:id", asyncMiddleware(async (req, res) => {
    let result = JoiCustomerValidation(req.body);
    if (result.error) return res.status(400).send(result.error);

    const Customer = await CustomerModel.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        new: true
    })
    if (!Customer) return res.status(404).send("Customer with Given ID could Not Found.")
    res.send(Customer);

}));

// deleting a Customer
router.delete("/:id", asyncMiddleware(async (req, res) => {

    const Customer = await CustomerModel.deleteOne({
        _id: req.params.id
    });
    res.send(Customer)

}));

module.exports = router;