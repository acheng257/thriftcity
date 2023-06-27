/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City FAQ page. Retrieves all FAQ question/answer pairs from the
 * faq.json file via GET request and displays on the screen.
 */

(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        queryAll("faq");
    }

    /**
     * Queries all the data from the FAQ JSON file and generates a question/answer list
     * that is added to the FAQ section of the FAQ HTML page.
     * @param {String} who specifies the JSON file to fetch data from.
     */
    async function queryAll(who) {
        let url = '/all/?who=' + who;
        let resp = await fetch(url);

        try {
            checkStatus(resp);
            let data = await resp.json();
            let faq = id("faq");
            let ul = gen("ul");
            ul.id = "faq-ul"

            for (const key in data) {
                let q = gen("li");
                let a = gen("li");
                q.innerHTML = data[key].question;
                q.id = "question";
                a.innerHTML = data[key].answer;
                a.id = "answer";
                ul.appendChild(q);
                ul.appendChild(a);
            }

            faq.appendChild(ul);
        }
        catch {
            handleError("Unable to fetch products. Please try again.");
        }
    }

    init();
})();