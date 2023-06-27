/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City products page. Initialized with display cards for all products 
 * contained in the products.json file using GET request. Filters items based on user choice from a 
 * dropdown menu and updates display based on filter using a GET request. Clicking on a product 
 * brings user to the single-product view.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        let women = id("filter-women");
        let men = id("filter-men");
        let unisex = id("filter-unisex");
        let sale = id("filter-sale");
        let toys = id("filter-toys");
        let acc = id("filter-acc");

        women.addEventListener('click', queryFilter);
        men.addEventListener('click', queryFilter);
        unisex.addEventListener('click', queryFilter);
        sale.addEventListener('click', queryFilter);
        toys.addEventListener('click', queryFilter);
        acc.addEventListener('click', queryFilter);
        queryAll("products");
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

            for (const key in data) {
                createCard(data[key], key);
            }
        }
        catch {
            handleError("Unable to fetch products. Please try again.");
        }
    }

    /** 
     * Function which uses a GET request to fetch all products that fall under a given filter.
     * Clears the current display and calls createCard to generate display cards for each item.
     */
    async function queryFilter() {
        let filter = this.textContent;
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