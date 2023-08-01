import P_categories from "./P_categories";

// Check the validations of inputs and successful fillup separately
// see if the costs calculator works
// check the add to wishlist, add to compare lists and email a friend
export default class Product{
    static addToCart(cat, subcat) {

        P_categories.directSubCategory(cat, subcat)
        const url = subcat === "Desktop" ? "/build-your-own-computer" :
            subcat === "Notebook" ? "/apple-macbook-pro-13-inch" :
                subcat === "Camera & photo" ? "/nikon-d5500-dslr" : "";
        // Click on the "Add to cart" button for the first product and check the URL
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.wait(2000)
        cy.url().should('include', url);
        cy.go(-1)

        // Click on the "Add to cart" button for the second product and check the URL
        cy.get('.product-item').eq(1).find('.product-box-add-to-cart-button').click();
        P_categories.topLinkCheck("cart")

        cy.get(".content a").should("contain.text", "shopping cart")

        // Click on the "Add to cart" button for the third product and check the URL
        cy.get('.product-item').eq(2).find('.product-box-add-to-cart-button').click();
        P_categories.topLinkCheck("cart")
        cy.get(".content a").should("contain.text", "shopping cart")
    }

    static addToCart2() {
        cy.get('.item-box').each(($card, index) => {
            cy.wrap($card).find('.product-box-add-to-cart-button').click();
            P_categories.topLinkCheck("cart")
            cy.get(".content a").should("contain.text", "shopping cart")
        });
    }

    static costCalculator(totalCost){
        // Each product has a different way
        // of calculating costs
        cy.get("#price-value-1").invoke('text')
            .then(priceString => {
                const priceWithoutSymbols = priceString.replace(/[$,]/g, '');
                const priceFloat = parseFloat(priceWithoutSymbols);
                const priceInteger1 = Math.round(priceFloat);
                const priceInteger = parseInt(priceInteger1);

                expect(priceInteger).equal(totalCost)
            })
    }

    static addToCompareList(){

    }
}