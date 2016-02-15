var express = require("express");
//schemas methods
var userModel_1 = require("../../../DBrepo/userModel");
var salesmanModel_1 = require("../../../DBrepo/salesmanModel");
var adminRoutes = express.Router();
//this route will return with company profile information
adminRoutes.get("/getCompanyProfile", function (req, res, next) {
    userModel_1.getCompanyProfile(req.query.uid).then(function (success) {
        console.log("ending res with company profile data");
        res.json(success);
    }, function (err) {
        res.json(err);
        return;
    });
});
//this route will regester a salesman in company
adminRoutes.post("/salesmanSignup", function (req, res, next) {
    //  db method "salesmanSignup"" will take an object in input like this object
    // {
    //     firstName: String,
    //     lastName: String,
    //     companyUid: String,
    //     email: { type: String, unique: true, require: true },  
    //     password : String,  
    //     createdOn: { type: Date, 'default': Date.now }, 
    //     firebaseUid: String
    // }
    salesmanModel_1.salesmanSignup({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        companyUid: req.query.uid,
        firebaseUid: "" //this field will fill by the method
    }).then(function (success) {
        console.log("signup success: ", success);
        res.json({ signup: true });
    }, function (err) {
        console.log("signup error: ", err);
        res.json({ signup: false, message: err });
    });
});
module.exports = adminRoutes;