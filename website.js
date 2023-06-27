/**
 * NAME: Alice Cheng
 * DATE: May 4, 2023
 * Javascript file for the Thrift City page; will be filled in as features are added.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
    "use strict";

    const BASE_URL = "http://localhost:8000"

    function init() {
        const btn = id('test-btn');
        btn.addEventListener('click', queryFilter);

        const feedbackBtn = id('feedback-btn');
        feedbackBtn.addEventListener('click', readForm);
    }

    function createCard(product) {
        let section = id("sales-home");
        let card = gen("section");
        let fig = gen("figure");
        let p = gen("p");

        p.textContent = product.itemName;
        
        let img = gen("img");
        img.src = product.image.src;
        img.alt = product.image.alt;

        fig.appendChild(img);
        fig.appendChild(p);
        card.appendChild(fig);
        section.appendChild(card);
    }

    /** TODO: fix this, this is a test */
    async function queryAll() {
        let who = 'eshani';
        let url = BASE_URL + '/all/?who=' + who;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();

            for (const key in data) {
                createCard(data[key]);
            }
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    /** TODO: fix this, this is a test */
    // Brings us to single view product page
    async function queryProduct() {
        let who = 'eshani';
        let product = 'product2';
        let url = BASE_URL + '/productInfo/?who=' + who + '&product=' + product;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json(); // returned data is the info for a single product
            createCard(data);
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    /** TODO: fix this, this is a test */
    //Clears shop page of all cards, generates cards per filter
    async function queryFilter() {
        let who = 'eshani';
        let filter = 'sale'
        let url = BASE_URL + '/filter/?who=' + who + '&filter=' + filter;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();
            
            for (const key in data) {
                createCard(data[key]);
            }
        }
        catch {
            handleError("Unable to display heading");
        }
    }

    async function readForm(){
       let feedback =  id("feedback").textContent;
       let url = BASE_URL + '/feedback?body=' + feedback; // What's the diff btwn this and having body in the fetch call
       
       let resp = await fetch(url, {method: "POST"});
    }

    init();
})();