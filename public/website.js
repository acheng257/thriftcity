/**
 * NAME: Alice Cheng
 * DATE: May 4, 2023
 * Javascript file for the Thrift City home page. Contains a navigation bar to switch between
 * pages and functionalities of the e-commerce store.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        queryFilter();
    }

    /**
     * Function which takes info for a specific product and generates a display card that is added
     * to the HTML section of the cart page.
     * @param {JSON} product object containing key-value pairs with product specifications
     * @param {String} key the key of the element in the JSON object
     */
    function createCard(product) {
        let section = id("sales-home");
        let card = gen("section");
        let fig = gen("figure");
        let p = gen("p");

        p.textContent = product.itemName;
        card.class = "product";
        
        let img = gen("img");
        img.src = product.image.src;
        img.alt = product.image.alt;

        fig.appendChild(img);
        fig.appendChild(p);
        card.appendChild(fig);
        section.appendChild(card);
    }

    /** 
     * Function which uses a GET request to fetch all products that fall under a given filter.
     * Clears the current display and calls createCard to generate display cards for each item.
     */
    async function queryFilter() {
        let filter = 'Featured';
        let url = '/filter/?filter=' + filter;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();
            
            for (const key in data) {
                createCard(data[key], key);
            }
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    init();
})();