import express = require("express");
import bodyParser = require("body-parser");
import url = require("url");

//schemas methods
import { doSignup, doLogin, validateToken } from "../../DBrepo/userModel";


let v1 = express.Router()

v1.use(bodyParser.json());


////////////////////////signup request///////////////////////////////////////////////////////////////////
v1.post("/signup", (req: express.Request, res: express.Response, next: Function) => {

    interface patternOfUserObject {

        email: string,
        password: string,
        firstName: string,      //this is a interface which is must required from front end
        lastName: string,
        companyName: string

    }

    let signupObject = req.body;

    console.log("data is : ", signupObject);

    doSignup(signupObject).then((success) => {

        console.log("signup success: ", success);

        res.json({ signup: true });

    },
        (err) => {
            console.log("signup error: ", err);
            res.json({ signup: false, message: err });
        });


});
/////////////////signup request//////////////////////////////////////////////////////////////////////






///////////////login resuest/////////////////////////////////////
v1.post("/login", (req: express.Request, res: express.Response, next: Function) => {
    
    //console.log(req.body , req.body.password );
    
    doLogin({

        email: req.body.email,
        password: req.body.password

    }).then(

        (success) => {
            res.json(success);
        },

        (err) => {
            res.json(err);
        });
});
///////////////login resuest/////////////////////////////////////



/////////start/////if not authenticated return with 401 not autherised/authenticated///////////////////////////////////////////////////
v1.use((req:express.Request , res:express.Response , next : Function )=>{
     
    console.log("token is: ", req.query.token);
     
   // let parsedUrl = url.parse(req.params.token);
     
    //console.log("parsed url is: " , parsedUrl);
     
    //validateToken();
    next();
    
});
///////////end///if not authenticated return with 401 not autherised/authenticated///////////////////////////////////////////////////


module.exports = v1;