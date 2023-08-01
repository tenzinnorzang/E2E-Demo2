export class CheckingOut{
    static validation (){

        cy.get("button").contains('Continue').click()
        cy.get('.inputs span').contains('Country is required.').should('be.visible')
        cy.get('.inputs span').contains('City is required').should('be.visible')
        cy.get('.inputs span').contains('Street address is required').should('be.visible')
        cy.get('.inputs span').contains('Zip / postal code is required').should('be.visible')
        cy.get('.inputs span').contains('Phone is required').should('be.visible')
    }
    static shippingMethod(){
        cy.get("#shippingoption_0").check()
        cy.get('#shipping-method-buttons-container > .button-1').click()
    }

    static paymentMethod() {
        cy.get("#paymentmethod_0").check()
        cy.get('#payment-method-buttons-container > .button-1').click()
    }

    static paymentInfo() {
        cy.get('#payment-info-buttons-container > .button-1').click()
    }

    static confirmOrder(){
        cy.get('#confirm-order-buttons-container > .button-1').click()
    }
}