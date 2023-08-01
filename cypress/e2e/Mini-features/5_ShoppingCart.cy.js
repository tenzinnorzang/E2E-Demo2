import {Login} from "../../misc/page-objects/Login_Registration/Login";
import {ShoppingCart} from "../../misc/page-objects/Mini-features/5_ShoppingCart";

describe('addToCart', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
        cy.get(".ico-cart").click()
        cy.url().should('include', "/cart")
    })


    it("Gift Wrap test", () => { //Yes
        //No
        ShoppingCart.checkGiftWrap('1')
        cy.get(".selected-checkout-attributes").should('contain.text', '\n' +
            '    Gift wrapping: No')

        // Yes
        ShoppingCart.checkGiftWrap('2')
        cy.get(".selected-checkout-attributes").should('contain.text', '\n' +
            '    Gift wrapping: Yes [+$10.00]')
    })


    it('should match', function () {
        ShoppingCart.priceQtyCheck()
    });

    it('should check Total', function () {
        ShoppingCart.amountCheck()
    });

    it("check the checkout Button", () => {
        ShoppingCart.checkOutValidation()
        ShoppingCart.checkOutClick()
    })

    // it('should Remove Computer Item from Cart', function () {
    //     ShoppingCart.removeItemCheck()
    //     cy.contains('.product-name', 'Build your own computer').should('not.exist');
    //     cy.get('.no-data').should('contain.text', "\n" +
    //         "Your Shopping Cart is empty!")
    // });

});