export  class AddToCart{
    static validationForBYOC(){
        cy.contains('button', 'Add to cart').click()
        cy.get('.bar-notification.error>p').contains("Please select RAM").should("be.visible")
        cy.get('.bar-notification.error>p').contains("Please select HDD").should("exist")
    }

    static fillUpBYOC(quantity){
        cy.get('select#product_attribute_1').select("1")
        cy.get('#product_attribute_2').select("4")
        cy.get("input#product_attribute_3_6").check().should('be.checked')
        cy.get("input#product_attribute_4_8").check().should('be.checked')
        cy.get("input#product_attribute_5_10").check().should('be.checked')
        cy.get('input#product_enteredQuantity_1').clear().type(quantity)
    }

    static AddToCart(quantity){

        cy.get(".cart-qty").invoke('text')
            .then((s) => {
                const start = s.indexOf('(')
                const end = s.indexOf(')', start)
                return s.slice(start+1, end)
            }).then(parseInt).should('be.a', 'number').as("num")

        cy.get('@num').then((preCount) => {
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${preCount})`)
            cy.contains('button', 'Add to cart').click()

            quantity = preCount+quantity
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${quantity})`)
        })
    }
}