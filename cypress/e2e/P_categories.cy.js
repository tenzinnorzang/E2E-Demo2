import {Login} from "../misc/page-objects/Login_Registration/Login";
import P_categories from "../misc/page-objects/P_categories";

describe('Check the common functionalities of the Products', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
    })

    // Check the sort by for only desktop if it works the rest should work
    it('should check the sort by function', function () {
        P_categories.directSubCategory("computers", "Desktop")
        // A to Z
        P_categories.sortBy('5')
        P_categories.arraySort("title", "sort")

        // Z to A
        P_categories.sortBy('6')
        P_categories.arraySort("title", "reverse")

        // Price high to low
        P_categories.sortBy('10')
        P_categories.arraySort("price", "sort")

        // Price low to high
        P_categories.sortBy('11')
        P_categories.arraySort("price", "reverse")
    });

    // Check the view mode for only desktops
    it('should switch between grid and list view modes', () => {
        P_categories.directSubCategory("computers", "Desktop")
        P_categories.selectView("list")

        // Verify that the list view mode is activated
        cy.get('.viewmode-icon.list').should('have.class', 'selected');
        cy.get('.viewmode-icon.grid').should('not.have.class', 'selected');

        P_categories.selectView("grid")

        // Verify that the grid view mode is activated
        cy.get('.viewmode-icon.grid').should('have.class', 'selected');
        cy.get('.viewmode-icon.list').should('not.have.class', 'selected');
    });

    // Check the add to cart buttons for only cell-phones
    it('should check the add to cart button', function () {
        P_categories.directSubCategory("electronics", "Cell phones")
        cy.get('.item-box').each(($card, index) => {
            cy.wrap($card).find('.product-box-add-to-cart-button').click();
            P_categories.topLinkCheck("cart")
            cy.get(".content a").should("contain.text", "shopping cart")
        });
    });

    it('should check the add to wishlist button', function () {
        P_categories.directSubCategory("electronics", "Cell phones")
        cy.get('.item-box').each(($card, index) => {
            cy.wrap($card).find('.button-2.add-to-wishlist-button').click();
            P_categories.topLinkCheck("wishlist")
            cy.get(".content a").should("contain.text", "wishlist")
        });
    });

    it('should check add to compare list button', function () {
        P_categories.directSubCategory("electronics", "Cell phones")
        cy.get('.item-box').each(($card, index) => {
            cy.wrap($card).find('.button-2.add-to-compare-list-button').click();
            cy.get(".content a").should("contain.text", "product comparison")
        });
    });
});
