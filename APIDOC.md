# Thrift City API Documentation
*Fill in a short description here about the API's purpose
(specific to the API, not a front-end client).
Can list any shared behavior for all endpoints, such as 500
error-handling.*

## *all (GET json Example)*
**Request Format:** localhost:8000/all?who=filename

**Returned Data Format**: JSON

**Description:** Retrieves all data stored in a JSON file, specified by a the "who" parameter passed in via URL.

**Supported Parameters** *List any optional/required parameters*
* who (required)
  * a String specifying the name of the JSON file to retrieve data from (without the .json extension)

**Example Request:** *Fill in example request(s)*
```
await fetch('all/?who=cart');
```

**Example Response:**
*Fill in example response in the ticks*

```json
{
    "product1": {
        "itemName": "Knit Tie-Front Mini Dress",
        "itemColor": "Light Blue Floral",
        "price": 20,
        "sale": false,
        "image": {
            "src": "imgs/products/hollister_dress.avif", 
            "alt": "Knit Tie-Front Mini Dress"
        },
        "description": "A cute floral dress perfect for spring and summer!",
        "filters": [
            "Women"
        ]
    },
        
    "product2": {
        "itemName": "Social Tourist V-Waist Skort",
        "itemColor": "Light Pink",
        "price": 15,
        "sale": false,
        "image": {
            "src": "imgs/products/hollister_skirt.avif", 
            "alt": "Social Tourist V-Waist Skort"
        },
        "description": "A vibrant pink color that'll pop out from the crowd.",
        "filters": [
            "Women"
        ]
    },

    "product3": {
        "itemName": "Relaxed Top Gun Graphic Tee",
        "itemColor": "Faded Black",
        "price": 20,
        "sale": false,
        "image": {
            "src": "imgs/products/hollister_graphic.avif", 
            "alt": "Relaxed Top Gun Graphic Tee"
        },
        "description": "Intricately designed graphic tee for all Top Gun lovers.",
        "filters": [
            "Unisex", "Men", "Women"
        ]
    }
}
```

**Error Handling:**
*Summarize any possible errors a client should know about*
*Fill in at least one example of the error handling*
If the file to read in is invalid or an error occurs when trying to open the file, an error message is displayed under the navigation bar of the site.

## *productInfo (GET json Example)*
**Request Format:** localhost:8000/productInfo?product=productJSON

**Returned Data Format**: JSON

**Description:** Returns a JSON object containing details about a specific product.

**Supported Parameters** *List any optional/required parameters and defaults*
* product (required)
  * a stringified JSON object containing the information for a specific product

**Example Request:** *Fill in example request(s)*
```
await fetch('productInfo/?product=productJSON');
```

**Example Response:**
*Replace the {} with the example response*

```json
{
    "itemName": "Knit Tie-Front Mini Dress",
    "itemColor": "Light Blue Floral",
    "price": 20,
    "sale": false,
    "image": {
        "src": "imgs/products/hollister_dress.avif", 
        "alt": "Knit Tie-Front Mini Dress"
    },
    "description": "A cute floral dress perfect for spring and summer!",
    "filters": [
        "Women"
    ]

}
```

**Error Handling:**
*Summarize any possible errors a client should know about*
*Fill in at least one example request/response of the error handling*
If the product info is invalid or null, an error will be thrown and an error message will be displayed on the website.

## *filter (GET json Example)*
**Request Format:** localhost:8000/filter?filter=category

**Returned Data Format**: JSON

**Description:** Retrieves all data corresponding to a specified filter by checking the filter list of each item in the JSON file.

**Supported Parameters** *List any optional/required parameters*
* filter (required)
  * a String specifying the category to filter by

**Example Request:** *Fill in example request(s)*
```
await fetch('filter/?filter=Toys');
```

**Example Response:**
*Fill in example response in the ticks*

```json
{
    "itemName": "Djungelskog",
    "itemColor": "Brown",
    "price": 30,
    "sale": false,
    "image": {
        "src": "imgs/products/djungelskog.avif", 
        "alt": "Djungelskog"
    },
    "description": "Adorable brown bear friend.",
    "filters": [
        "Toys"
    ]
 }
```

**Error Handling:**
*Summarize any possible errors a client should know about*
*Fill in at least one example of the error handling*
If the filter category is invalid or null, an error will be thrown and an error message will be displayed on the website.

## *feedback (POST Example)*
**Request Format:** localhost:8000/feedback?body=textContent

**Returned Data Format**: Plain text (empty string)

**Description:** Writes the text stored in the body parameter of the URL to a feedback text file.

**Supported Parameters** *List any optional/required parameters*
* POST body parameters:
    * body - (required) the text containing user-inputted feedback

**Example Request:** localhost:8000/feedback?body=This%20is%20feedback

**Error Handling:**
*Summarize any possible errors a client should know about*
*Fill in at least one example request/response of the error handling*

## *cart (POST Example)*
**Request Format:** localhost:8000/cart?method=addOrRemove&body=productInfo

**Returned Data Format**: Plain text (empty string)

**Description:** If method is 'add', appends the product information (JSON string) stored in the body parameter to cart.json. Else, removes the product in the body parameter from the cart.json file.

**Supported Parameters** *List any optional/required parameters*
* POST body parameters:
    * method - (required) 'add' or 'remove', specifies action to take with product
    * body - (required) the text containing user-inputted feedback

**Example Request:** localhost:8000/cart?method=add&body=productInfo

**Error Handling:**
*Summarize any possible errors a client should know about*
*Fill in at least one example request/response of the error handling*
If the method or body are null, an error will be displayed on the website.