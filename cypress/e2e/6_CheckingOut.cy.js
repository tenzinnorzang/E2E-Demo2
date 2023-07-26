import {Login} from "../misc/page-objects/Login";
import {ShoppingCart} from "../misc/page-objects/5_ShoppingCart";
import {CheckingOut} from "../misc/page-objects/6_CheckingOut";
import {checkOutDetails} from "../misc/utils";

describe('Checkout Form Fill Up Tests', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })

        cy.visit("https://demo.nopcommerce.com/cart")
        ShoppingCart.checkGiftWrap("2")
        ShoppingCart.checkOutClick()
    })

    it('Validation check', function () {

        CheckingOut.validation()
    });

    it('should fill Check Out Form ', function () {

        checkOutDetails()
        cy.get("button").contains('Continue').click()
        CheckingOut.shippingMethod()
        CheckingOut.paymentMethod()
        CheckingOut.paymentInfo()
        CheckingOut.confirmOrder()

        cy.get("h1").contains("Thank you").should("be.visible")
        cy.get(".title > strong").should("contain.text", "Your order has been successfully processed!")

    });

});