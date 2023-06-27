/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City promotions/sales page. Filters products for ones that are
 * tagged to be on sale and generates display cards for each one using a GET request. Clicking 
 * on a display card brings user to the single-product view for that item.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        queryFilter("products");
    }

    /**
     * Function which takes info for a specific product and generates a display card that is added
     * to the HTML section of the cart page.
     * @param {JSON} product object containing key-value pairs with product specifications
     * @param {String} key the key of the element in the JSON object
     */
    function createCard(product, key) {
        let section = id("sales");
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
        card.addEventListener('click', toggleSingleProductView);
        section.appendChild(card);
    }

    /** 
     * Function which uses a GET request to fetch all products that fall under a given filter.
     * Clears the current display and calls createCard to generate display cards for each item.
     */
    async function queryFilter() {
        let who = 'alice';
        let filter = "Sale";
        let url = '/filter/?filter=' + filter;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();
            let cards = id("sales");

            cards.innerHTML = "";
            
            for (const key in data) {
                createCard(data[key], key);
            }
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    /**
     * Changes page view to the single-product view of the product that was clicked on.
     */
    function toggleSingleProductView() {
        window.location.href = "/single-product.html?" + this.id;
    }

    init();
})();