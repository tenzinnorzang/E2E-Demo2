import Search from "../misc/page-objects/Search";

describe('Search Functionality tests', function () {
    beforeEach(() => {
        cy.visit("/")
    });

    it('should check if the currency changes', function () {
        Search.changeCurrency('US Dollar')
        cy.get("span.price.actual-price").should('contain.text', '$')

        Search.changeCurrency("Euro")
        cy.get("span.price.actual-price").should('contain.text', '€')
    });

    it('should search for the word', function () {
        Search.searchWord("Cell")
        cy.get("#q").should('have.value', 'Cell')
    });

    it('validation of the words', function () {
        Search.searchWord("kk")
        cy.get(".warning").should("contain.text", "Search term minimum length is 3 characters")
    });

    it('results not displayed', function () {
        Search.searchWord("kings")
        cy.get(".no-result")
            .should('contain.text', 'No products were found that matched your criteria.')
    });
});



