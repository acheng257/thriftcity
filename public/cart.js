/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City cart page. Handles removal of item from cart via POST 
 * request to update the cart.json file with the item removed. Re-generates product display cards
 * when items are updated.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        queryAll("cart");
    }

    /**
     * Function which takes info for a specific product and generates a display card that is added
     * to the HTML section of the cart page.
     * @param {JSON} product object containing key-value pairs with product specifications
     * @param {String} key the key of the element in the JSON object
     */
    function createCard(product, key) {
        let section = id("cart");
        let card = gen("section");
        let fig = gen("figure");
        let p = gen("p");
        let btn = gen("button");
        
        btn.class = "dropbtn";
        btn.innerHTML = "Remove from Cart"; // TODO: add event listener
        btn.addEventListener('click', removeFromCart);

        p.innerHTML = product.itemName;
        card.id = product.itemName;
        
        let img = gen("img");
        img.src = product.image.src;
        img.alt = product.image.alt;

        fig.appendChild(img);
        fig.appendChild(p);
        fig.appendChild(btn);
        card.appendChild(fig);
        section.appendChild(card);
    }

    /** 
     * Function which uses a GET request to fetch all items in the cart stored in a JSON file.
     * Calls createCard to generate display cards for each item.
     * @param String who indicating name of JSON file to fetch from
     */
    async function queryAll(who) {
        let url = '/all/?who=' + who;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();

            for (const key in data) {
                createCard(data[key], key);
            }
        }
        catch {
            handleError("Unable to fetch products in cart. Please try again.");
        }
    }

    /**
     * Uses a GET and POST request to first get all the items in the cart, remove the appropriate item,
     * and then rewrite the new list of items to the JSON file.
     */
    async function removeFromCart() {
        let url = '/all/?who=cart';
        let resp = await fetch(url);

        let card = this.parentNode.parentNode;

        try {
            checkStatus(resp);
            let data = await resp.json();
            // remove from cart.json list: should i change it to json format instead of a list
            for (const key in data) {
                if (data[key].itemName == card.id) {
                    //remove from data
                    data.splice(key, 1);
                }
            }
            data = await JSON.stringify(data);

            // Remove from cart.json
            updateCart(data);
        }
        catch {
            handleError("Error removing item from cart. Please try again.")
        }

        card.remove();
    }

    /**
     * Helper method to update the cart JSON file with new data.
     * @param {String} data stringified JSON info to be written to file.
     */
    async function updateCart(data) {
        let url = '/cart?method=remove&body=' + data;
        let resp = await fetch(url, {method: "POST"});
    }

    init();
})();