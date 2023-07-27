import {Login} from "../misc/page-objects/Login";
import DesktopPage from "../misc/page-objects/DesktopPage";

describe('Test suite for Computer Items', function () {
//     // has three types desktops, notebooks, and software
//     // desktop has three items with name, review, and price
//     // Notebook has 6 items with name, review, and price
//     // software has three items with name, review, and price
//
//     // check if there are three items for computers
//     // Click on desktop
//     // check if the number of items is three
//     // Check if the add to cart button is working (by seeing the pop up messages
//     // or counting the number in the cart)
//     // see if the cart gets updated with the items

    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
    })

    it('should check if computer has three items', function () {
        DesktopPage.goToPage("computers")
        cy.url().should('include', '/computers')
        cy.contains('.category-grid .title a', 'Desktops').should('be.visible');
        cy.contains('.category-grid .title a', 'Notebooks').should('exist');
        cy.contains('.category-grid .title a', 'Software').should('be.visible');
    });

    it('Desktop has three items', function () {

        DesktopPage.directSubCategory("computers", "Desktop")
        cy.url().should("include", "/desktop")

        cy.contains('.product-title a', 'Build your own computer').should('be.visible');
        cy.contains('.product-title a', 'Digital Storm VANQUISH 3 Custom Performance PC').should('exist');
        cy.contains('.product-title a', 'Lenovo IdeaCentre 600 All-in-One PC').should('be.visible');
    });

    it('should check the sort by function', function () {

        DesktopPage.directSubCategory("computers", "Desktop")
        // A to Z // changelfsdjls
        DesktopPage.sortBy('5')
        cy.get('.product-title > a')
            .then(($productNames) => {
                const productNameArray = Array.from($productNames, (el) => el.innerText.trim());
                const sortedProductTitles = productNameArray.sort()

                expect(sortedProductTitles).to.deep.equal(productNameArray);
            });

        // Z to A
        DesktopPage.sortBy('6')
        cy.get('.product-title > a')
            .then(($productNames) => {
                const productNameArray = Array.from($productNames, (el) => el.innerText.trim());
                const sortedProductTitles = productNameArray.reverse()

                expect(sortedProductTitles).to.deep.equal(productNameArray);
            });

        // Price high to low
        DesktopPage.sortBy('10')
        cy.get('.price.actual-price')
            .then(($productPrices) => {
                const productPriceArray = Array.from($productPrices, (el) => el.innerText.trim());
                const sortedProductPrices = productPriceArray.sort()

                expect(sortedProductPrices).to.deep.equal(productPriceArray);
            });

        // Price low to high
        DesktopPage.sortBy('11')
        cy.get('.price.actual-price')
            .then(($productPrices) => {
                const productPriceArray = Array.from($productPrices, (el) => el.innerText.trim());
                const sortedProductPrices = productPriceArray.reverse()

                expect(sortedProductPrices).to.deep.equal(productPriceArray);
            });
    });
});

describe('View modes', () => {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
    })

    it('should switch between grid and list view modes', () => {
        DesktopPage.directSubCategory("computers", "Desktop")

        // Click on the "List" view mode button
        cy.get('.viewmode-icon.list').click();

        // Verify that the list view mode is activated
        cy.get('.viewmode-icon.list').should('have.class', 'selected');
        cy.get('.viewmode-icon.grid').should('not.have.class', 'selected');

        // Click on the "Grid" view mode button
        cy.get('.viewmode-icon.grid').click();

        // Verify that the grid view mode is activated
        cy.get('.viewmode-icon.grid').should('have.class', 'selected');
        cy.get('.viewmode-icon.list').should('not.have.class', 'selected');
    });
});

describe('check Add to cart button ', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
    })

    it('should check the add to cart button', function () {
        DesktopPage.directSubCategory("electronics", "Cell phones")

        cy.get('.item-box').each(($card, index) => {
            // let name1, price1
            cy.wrap($card).find('.product-box-add-to-cart-button').click();
            DesktopPage.quantityCheck()
            // DesktopPage.checkInCart()
        });
    });

});

// describe('check Add to wishlist button ', function () {
//
// });
//
// describe('check Add to compare list button ', function () {
//
// });

