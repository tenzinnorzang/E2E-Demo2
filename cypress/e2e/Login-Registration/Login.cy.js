import {Login} from "../../misc/page-objects/Login_Registration/Login";

describe('Login Page Negative Tests', function () {
    beforeEach(function (){
        cy.visit("/")
        cy.contains('a', 'Log in').click()
    })

    it('should display errors empty email input field', function () {
        cy.get(".button-1.login-button").click()
        cy.get('#Email-error').should("contain.text", 'Please enter your email')
    });

    it('should display errors invalid email', function () {
        Login.loginforValidation("ttt.com", "12234")
        cy.get('#Email-error').should("contain.text", 'Wrong email')
    });

    it('should display error for Wrong Password', function () {
        cy.fixture('example').then((userData) => {
            Login.loginforValidation(userData.email, "invalid Password")
        })
        cy.get(".message-error.validation-summary-errors")
            .should("contain.text", "Login was unsuccessful. Please correct the errors and try again.")
    });

    //Doubt
    it('should check forgot password', function () {
        cy.get(".forgot-password >a").click()
        cy.url().should('include', '/passwordrecovery')

        Login.forgotPassword()
    });
});

describe('Login Page Positive test', function () {
    beforeEach(function (){
        cy.visit("/")
        cy.contains('a', 'Log in').click()
    })

    it('test successful Login', function () {
        cy.fixture('example').then((userData) => {
            Login.loginforValidation(userData.email,'123456')
            cy.get('a.ico-logout').should("contain.text", "Log out")
        })
    });
});