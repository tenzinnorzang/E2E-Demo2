import {Login} from "../misc/page-objects/Login_Registration/Login";
import P_categories from "../misc/page-objects/P_categories";
import Product from "../misc/page-objects/Product";

// Check the validations of inputs and successful fillup separately
// see if the costs calculator works
// check the add to wishlist, add to compare lists and email a friend

describe('Check the Desktop Products', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
    })

    it('Check the add to cart button', function () {
        Product.addToCart("computers", "Desktop")
    });

    it('should check the cost calculator', function () {
        // 1. Select all the necessary value
        // 2. see if the total cost matches

        P_categories.directSubCategory("computers", "Desktop")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        const baseCost = 1200
        cy.get('#product_attribute_1').select("2")
        cy.get('#product_attribute_2').select("4")
        cy.get("#product_attribute_3_6").check("6")
        cy.get("#product_attribute_4_8").check("8")

        const totalCost = baseCost + 15 + 50 + 50
        Product.costCalculator(totalCost)
    });

    it('check add to cart and wishlist buttons', function () {
        P_categories.directSubCategory("computers", "Desktop")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();

        cy.get('#product_attribute_1').select("2")
        cy.get('#product_attribute_2').select("4")
        cy.get("#product_attribute_3_6").check("6")
        cy.get("#product_attribute_4_8").check("8")

        cy.get("#add-to-cart-button-1").click();
        P_categories.topLinkCheck("cart")
        cy.get(".content a").should("contain.text", "shopping cart")

        // Check add to wish lists
        cy.get('.compare-products > .button-2').click()
        cy.get(".content a").should("exist")

        // Check add to compare lists
        cy.get('.compare-products > .button-2').click()
        cy.get(".content a").should("exist")
    });
});
