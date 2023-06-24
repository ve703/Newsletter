// jshint esversion:6
const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
// const { status } = require("express/lib/response");

const https = require("https");
const req = require("express/lib/request");


const app = express();

require('dotenv').config() //to use the variables from env via process.env

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
     
   
const data ={
    members: [
        {
           email_address: email,
           status: "subscribed",
           merge_fields: {
               FNAME: firstName,
               LNAME: lastName
        }
    }
    ]
};
 
const jsonData = JSON.stringify(data);

const url ="https://us21.api.mailchimp.com/3.0/lists/b42e43970a";

const options =
{
method: "POST",
auth: "vedant1:"+ process.env.key
}; 
const request= https.request(url,options, function (response) {

    if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
    console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started on port 3000");
    console.log(process.env.key);
});


// API KEY
// f9a5a6568c452e189d441badd917f9c7-us21

// LIST ID
//b42e43970a 
