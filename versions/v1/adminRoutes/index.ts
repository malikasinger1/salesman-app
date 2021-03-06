
import express = require("express");
import bodyParser = require("body-parser");
import url = require("url");

//schemas methods
import { getCompanyProfile }                from "../../../DBrepo/userModel";
import { salesmanSignup, getSalesmanList }  from "../../../DBrepo/salesmanModel";
import { getOrderList, deleteOrders, makeAnOrderRead}                      from "../../../DBrepo/orderModel";

let adminRoutes = express.Router()


//this route will return with company profile information
adminRoutes.get("/getCompanyProfile", (req: express.Request, res: express.Response, next: Function) => {

    getCompanyProfile(req.query.uid).then(

        (success) => {
            console.log("ending res with company profile data");
            res.json(success);
        },
        (err) => {

            res.json(err);
            return;
        });
});



//return with list of salesman related to this company
adminRoutes.get("/getSalesmanList", (req: express.Request, res: express.Response, next: Function) => {

    getSalesmanList.byCompanyId(req.query.uid).then(
        (salesmanList) => {
            console.log("ending res with salesman list");
            res.json(salesmanList);
        },
        (err) => {
            res.json(err);
            return;
        });
});


//this route will regester a salesman in company
adminRoutes.post("/salesmanSignup", (req: express.Request, res: express.Response, next: Function) => {

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
    
    salesmanSignup({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        companyUid: req.query.uid,
        firebaseUid: "" //this field will fill by the method
        
    }).then((success) => {

        console.log("signup success: ", success);

        res.json({ signup: true });

    },
        (err) => {
            console.log("signup error: ", err);
            res.json({ signup: false, message: err });
        });
});


adminRoutes.get("/getOrderList", (req: express.Request, res: express.Response, next: Function) => {

    console.log("get order by salesman is hitted");

    getOrderList.asCompany(req.query.uid).then(

        (success) => {
            //console.log("order is placed successfully");
            res.json(success);
        },
        (err) => {

            res.json(err);
            return;
        });

})


adminRoutes.post("/deleteOrders", (req: express.Request, res: express.Response, next: Function) => {

    console.log("deleteOrders is hitted");

    deleteOrders(req.query.uid, req.body.arrayOfOrderId).then(

        (success) => {
            //console.log("order is placed successfully");
            res.json({ deleted: true });
        },
        (err) => {
            res.json({
                deleted: false,
                error: err
            });
            return;
        });
})


adminRoutes.post("/makeAnOrderRead", (req: express.Request, res: express.Response, next: Function) => {

    console.log("makeAnOrderRead is hitted");

    makeAnOrderRead(req.body._id).then(

        (success) => {

            res.json({ updated: true });
        },
        (err) => {
            res.json({
                updated: false,
                error: err
            });
            return;
        });
})




module.exports = adminRoutes;