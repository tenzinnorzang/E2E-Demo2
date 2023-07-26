import {Login} from "../misc/page-objects/Login";
import {AddToCart} from "../misc/page-objects/AddToCart";

describe('Add To Cart Functionality', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
    })

    // Computers
    it('should check for computers', function () {
        cy.visit("https://demo.nopcommerce.com/desktops")
        AddToCart.addToCart("Digital Storm VANQUISH 3 Custom Performance PC")
        AddToCart.addToCart("Lenovo IdeaCentre 600 All-in-One PC")
    });

    // Electronics
    it('should check for electronics', function () {
        cy.visit("https://demo.nopcommerce.com/camera-photo")
        AddToCart.addToCart("Leica T Mirrorless Digital Camera")
    })

    // Apparel
    // Digital Downloads
    // Books
    // Gift Card

});