"use strict";

/* File comment */

const express = require("express");
const fs = require("fs");
const app = express();
// if serving front-end files in public/
app.use(express.static("public")); 

// if handling different POST formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//all elemenents
app.get("/all", function (req, res) {
    let who = req.query.who;
    if (who == null) {
        res.status(400).send("Error connecting to store.");
    }
    
    res.type("json");

    fs.readFile("public/" + who + ".json", "utf8", (err, result) => {
        if (err) {
          handleError("Error retrieving information. Please try again.");
        } else {
          const data = JSON.parse(result);
          res.send(data);
        }
      });
   
    
})

//individual elements
app.get("/productInfo", function (req, res) {
    let product = req.query.product;

    res.type = ('json');

    if (product == null) {
        res.status(400).send("Error retrieving product.");
    }

    fs.readFile("public/products.json", "utf8", (err, result) => {
        if (err) {
          handleError("Error retrieving product. Please try again.");
        } else {
          const data = JSON.parse(result);
          res.send(data[product]);
        }
    });
    
})

app.get("/filter", function (req, res) {
    let filter = req.query.filter;

    if (filter == null) {
        res.status(400).send("Error retrieving product.");
    }

    res.type("json");
    fs.readFile("public/products.json", "utf8", (err, result) => {
        if (err) {
          handleError("Error filtering products. Please try again.");
        } else {
          let data = JSON.parse(result);
          data = filterItems(data, filter);
          res.send(data);
        }
    });
})

app.post("/feedback", function (req, res) {
    let message = req.query.body;

    message = message + "\n";

    fs.appendFile("public/feedback.txt", message, "utf8", (err, result) => {
        if (err) {
          handleError("Error submitting feedback.");
        } 
        else {
            res.send("");
        }
    });
})

app.post("/cart", function (req, res) {
  let cartjson = req.query.body;
  let m = req.query.method;

  if (m == null) {
    handleError("Method not specified. Please specify an action for the selected product.");
  }

  else if (cartjson == null) {
    handleError("Product not specified. Please select a product to add or remove from the cart.");
  }

  if (m == "add") {
    let message = cartjson;
    cartjson = fs.readFileSync("public/cart.json","utf-8");
    let cart = JSON.parse(cartjson);
    cart.push(JSON.parse(message));
    cartjson = JSON.stringify(cart);
  }

  fs.writeFile("public/cart.json", cartjson, "utf8", (err, result) => {
      if (err) {
        handleError("Error editing cart contents.");
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
        if (item.filters.includes(filter))
          json[key] = item;
    }
    return json;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
