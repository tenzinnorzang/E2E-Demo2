import {Registration} from "../../misc/page-objects/Login_Registration/Registration";

describe('Registration Negative tests', function () {
    beforeEach(function (){
        cy.visit("/")
        cy.contains('a', 'Register').click()
    })

    it('should display errors for empty inputs', function () {

        cy.get("button").contains('Register').click()
        cy.get("#FirstName-error").should('be.visible').contains("First name is required")
        cy.get('#LastName-error').should('be.visible').contains('Last name is required.')
        cy.get('#Email-error').should('be.visible').contains('Email is required.')
        cy.get('#Password-error').should('be.visible').contains('Password is required.')
        cy.get('#ConfirmPassword-error').should('be.visible').contains('Password is required.')
    });

    it('should display errors for password mismatch', function () {

        Registration.register("123ff", "123fff")

        cy.get('#Password-error').then((el) => {
            cy.wrap(el).contains('Password must meet the following rules: ')
            cy.wrap(el).contains('must have at least 6 characters')
        })

        cy.get('#ConfirmPassword-error').should('contain', 'The password and confirmation password do not match.')
    });

    it('should display errors for incorrect length of password', function () {
        Registration.register("123", "123fff")

        cy.get('#Password-error').then((el) => {
            cy.wrap(el).contains('Password must meet the following rules: ')
            cy.wrap(el).contains('must have at least 6 characters')
        })
    });

});

describe('Registration Positive Test', function () {
    beforeEach(function (){
        cy.visit("/")
        cy.contains('a', 'Register').click()
    })

    it('test successful registration', function () {
        Registration.register('123456', '123456')
        cy.contains('Your registration completed').should('be.visible')
    });
});