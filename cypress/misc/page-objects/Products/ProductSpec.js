import {randStreetAddress} from "@ngneat/falso";

export default class ProductSpec{
    static dropDownInput(pro, ram, hdd, os){
        cy.get('#product_attribute_1').select(pro)
        cy.get('#product_attribute_2').select(ram)
        cy.get("#product_attribute_3_6").check(hdd)
        cy.get("#product_attribute_4_8").check(os)
        cy.get('#product_enteredQuantity_1').clear().type("1")
        cy.contains('button', 'Add to cart').click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    }
    static fillUpDetails(quantity){
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

    static checkMe(index, price){
        const inputSelector = index === 0 ? "#addtocart_35_CustomerEnteredPrice" : "#addtocart_36_CustomerEnteredPrice"
        const btnSelector = index === 0 ? "#add-to-cart-button-35" : "#add-to-cart-button-36"
        cy.get('.product-item').eq(index).find('.product-box-add-to-cart-button').click();
        cy.get(inputSelector).clear().type(price)
        cy.contains('button', 'Add to cart').click()
        cy.get(btnSelector).click()
    }

    static selectDate(start, end){
        cy.get("#rental_start_date_40").clear().type(start)
        cy.get("#rental_end_date_40").clear().type(end)
        cy.get("#add-to-cart-button-40").click({force: true})
    }
}