var mongoose = require("mongoose"); //mongodb driver
var Firebase = require("firebase");
var q = require("q"); //to return deferred.promise from function

var ref = new Firebase("https://sales-man-app.firebaseio.com/");


let notification = {


    incrementOne: (companyUid) => {

        let notificationcount = null;

        let notificationNode = ref.child(companyUid.toString() + "/notificationCount");

        //firstly get current notification count by ref.once function    
        notificationNode.once("value", function(snapshot) {
            // console.log("this data is received by ref.once firebase in json form: ", snapshot.val());

            notificationcount = snapshot.val();
            
            //console.log(notificationcount , typeof notificationcount);            

            //increment one
            //null from firebase on no previous data is handled by if statment
            if (notificationcount) notificationcount++;
            else notificationcount = 1; 

            //then save this notification value to firabase
            notificationNode.set(notificationcount);
        })
    },


    clear: (companyUid) => {
        let notificationNode = ref.child(companyUid.toString() + "/notificationCount");
        notificationNode.set(0);
    }

}



// for checling
// notification.incrementOne(123);

let hiddenNotification = {


    incrementOne: (companyUid) => {

        let notificationcount = null;

        let notificationNode = ref.child(companyUid.toString()).child("hidenNotification");

        //firstly get current notification count by ref.once function    
        notificationNode.once("value", function(snapshot) {
            // console.log("this data is received by ref.once firebase in json form: ", snapshot.val());

            notificationcount = snapshot.val();
            
            //console.log(notificationcount , typeof notificationcount);            

            //increment one
            //null from firebase on no previous data is handled by if statment
            if (notificationcount) notificationcount++;
            else notificationcount = 1; 

            //then save this notification value to firabase
            notificationNode.set(notificationcount);
        })
    },


    clear: (companyUid) => {
        let notificationNode = ref.child(companyUid.toString() + "/hidenNotification");
        notificationNode.set(0);
    }

}



// for checling
// notification.incrementOne(123);


export { notification , hiddenNotification}


