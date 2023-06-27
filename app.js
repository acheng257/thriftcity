"use strict";

/* File comment */

const express = require("express");
const fs = require("fs");
// other modules you use
// program constants

const app = express();
// if serving front-end files in public/
app.use(express.static("public")); 

// if handling different POST formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(multer().none());

// app.get/app.post endpoints

//all elemenents
app.get("/all", function (req, res) {
    let who = req.query.who;
    if (who == null) {
        res.status(400).send("Error connecting to store.");
    }
    
    res.type("json");

    fs.readFile("public/test_products.json", "utf8", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const data = JSON.parse(result);
          res.send(data);
        }
      });

    // if(who=="alice"){
    //     //json = {"message": "alice"};
    // }
    // if(who=="eshani"){
    //     //json = {"message": "eshani"};
    // }
   
    
})

//individual elements
app.get("/productInfo", function (req, res) {
    let who = req.query.who;
    let product = req.query.product;

    res.type = ('json');

    if (who == null) {
        res.status(400).send("Error connecting to store.");
    }

    else if (product == null) {
        res.status(400).send("Error retrieving product.");
    }

    fs.readFile("public/test_products.json", "utf8", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const data = JSON.parse(result);
          console.log(data[product]);
          res.send(data[product]);
        }
    });
})


app.get("/filter", function (req, res) {
    let who = req.query.who;
    let filter = req.query.filter;

    if (who == null) {
        res.status(400).send("Error connecting to store.");
    }

    else if (filter == null) {
        res.status(400).send("Error retrieving product.");
    }

    res.type("json");
    fs.readFile("public/test_products.json", "utf8", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          let data = JSON.parse(result);
          data = filterItems(data, filter);
          console.log(data);
          res.send(data);
        }
    });
})

app.post("/feedback", function (req, res) {
    let message = req.query.body;

    message = message + "\n";

    fs.appendFile("public/feedback.txt", message, "utf8", (err, result) => {
        if (err) {
          console.error(err);
        } 
        else {
            res.send("");
        }
    });
})


// helper functions

function filterItems(data, filter){
    let json = {};
    for (const key in data) {
        let item = data[key];
        item.filters.includes(filter);
        json[key] = item;
    }
    return json;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
