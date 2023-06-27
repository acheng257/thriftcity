/**
 * NAME: Alice Cheng
 * DATE: June 7, 2023
 * Javascript file for the Thrift City feedback page. Handles user input in the text area and
 * writes text content to a text file via POST request.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
    "use strict";

    /**
     * Initializes the JS file in the runtime.
     */
    function init() {
        const btn = id("feedback-btn");
        let thanks = id("thanks");

        btn.addEventListener('click', readForm);
        thanks.classList.add("hidden");
    }

    /**
     * Reads the text content of the textarea element in the feedback HTML page and
     * creates a POST request to write to a text file.
     */
    async function readForm(){
       let feedback =  id("feedback").value;
       if (feedback == "") {
        let error = id("error");
        error.classList.remove('hidden');
       }
       else {
        let thanks = id("thanks");
        let btn = id("feedback-btn");
        let url = '/feedback?body=' + feedback; // What's the diff btwn this and having body in the fetch call
        
        let resp = await fetch(url, {method: "POST"});
        thanks.classList.remove('hidden');
        btn.removeEventListener('click', readForm);

        if (!id("error").classList.contains('hidden')) {
            id("error").classList.add('hidden');
        }
       }
    }

    init();
})();