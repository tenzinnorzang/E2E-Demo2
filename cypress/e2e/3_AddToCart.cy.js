import {Login} from "../misc/page-objects/Login";
import {AddToCart} from "../misc/page-objects/3_AddToCart";

describe('Add To Cart Test', function () {
    beforeEach(function (){

        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
    })

    it('Add to Cart for Build your Own Computers', function () {
        cy.visit("/")
        cy.contains('a', 'Build your own computer').click({force: true})

        //validation

        AddToCart.validationForBYOC()
        AddToCart.fillUpBYOC(5)
        AddToCart.AddToCart(5)

        //cy.contains(".content").should("contain.text", "The product has been added to your")
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });
});