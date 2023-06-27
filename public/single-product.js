/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City single-product view page. Handles adding item to cart by
 * using a GET request to retrieve all current items in the cart, adding the new item as a JSON
 * object to the list, and then using a POST request to write the updated list to a cart.json.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        let product = location.search.substring(1);
        queryProduct(product);
    }

    /**
     * Function which takes info for a specific product and generates a display card that is added
     * to the HTML section of the cart page.
     * @param {JSON} product object containing key-value pairs with product specifications
     * @param {String} key the key of the element in the JSON object
     */
    function createCard(product, key) {
        let section = id("single-prod");
        let card = gen("section");
        let fig = gen("figure");
        let p = gen("p");

        p.innerHTML = product.itemName;
        p.innerHTML += '<br />$' + product.price;
        card.id = key;
        
        let img = gen("img");
        img.src = product.image.src;
        img.alt = product.image.alt;

        fig.appendChild(img);
        fig.appendChild(p);
        card.appendChild(fig);
        section.appendChild(card);
    }

    /**
     * Function which takes info for a specific product and generates a p element that is added
     * to the single-product view next to the product image that lists some descriptions about
     * the product.
     * @param {JSON} product object containing key-value pairs with product specifications
     * @param {String} key the key of the element in the JSON object
     */
    function createProductInfo(product, key) {
        let section = id("single-prod");
        let info = gen("p");
        let list = gen("ul");
        let btn = gen("button");
        
        btn.class = "dropbtn";
        btn.innerHTML = "Add to Cart";
        btn.addEventListener('click', writeToCart);

        let color = gen("li");
        let desc = gen("li");

        color.innerHTML = product['itemColor'];
        desc.innerHTML = product['description'];

        list.appendChild(desc);
        list.appendChild(color);

        info.id = "product-info";
        info.appendChild(list);
        info.appendChild(btn);
        section.appendChild(info);
    }

    /** 
     * Function which uses a GET request to fetch all products stored in a JSON file.
     * Calls createCard to generate display cards for each item.
     * @param String who indicating name of JSON file to fetch from
     */
    async function queryAll(who) {
        let url = '/all/?who=' + who;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();
            return data;
        }
        catch {
            handleError("Unable to fetch products. Please try again.");
        }
    }

    /** 
     * Function which uses a GET request to fetch a specific product stored in a JSON file.
     * Calls createCard and createProductInfo to display details about the product.
     * @param {JSON} product object containing key-value pairs with product specifications
     */
    async function queryProduct(product) {
        let url = '/productInfo/?product=' + product;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json(); // returned data is the info for a single product

            createCard(data, product);
            createProductInfo(data, product);
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    /**
     * Creates a POST request to add the item which was clicked to a JSON file for the cart.
     */
    async function writeToCart() {
        let allProducts = await queryAll("products");
        let key = location.search.substring(1);
        let json = allProducts[key];
        let message = await JSON.stringify(json);
        let url = '/cart?method=add&body=' + message;

        let resp = await fetch(url, {method: "POST"});
    }

    init();
})();