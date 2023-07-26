export class AddToCart {
    static addToCart() {
        cy.get(".cart-qty").invoke('text')
            .then((s) => {
                const start = s.indexOf('(')
                const end = s.indexOf(')', start)
                return s.slice(start+1, end)
            }).then(parseInt).should('be.a', 'number').as("num")

        cy.get('@num').then((preCount) => {
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${preCount})`)

            const quantity = preCount+1
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${quantity})`)
        })
    }
}

//if (name === "Digital Storm VANQUISH 3 Custom Performance PC"){
//     // To click the "Add to cart" button for the item with data-productid="2"
//     cy.get('[data-productid="2"]')  // Select the item card with data-productid="2"
//         .find('.button-2.product-box-add-to-cart-button') // Find the "Add to cart" button inside the card
//         .click();
//     cy.get('.content').contains("The product has been added to your ").should("be.visible")
//
// }else if(name === "Lenovo IdeaCentre 600 All-in-One PC"){
//     // To click the "Add to cart" button for the item with data-productid="3"
//     cy.get('[data-productid="3"]')
//         .find('.button-2.product-box-add-to-cart-button')
//         .click();
//     cy.get('.content').contains("The product has been added to your ").should("be.visible")
//
// }else if(name === "Build your own computer"){
//     // To click the "Add to cart" button for the item with data-productid="1"
//     cy.get('[data-productid="1"]')
//         .find('.button-2.product-box-add-to-cart-button')
//         .click();
// }