export  class Login{
    static login(email, pwd) {
        cy.session([email], () => {
            cy.visit("/")
            cy.contains('a', 'Log in').click()
            cy.get("#Email").type(email)
            cy.get("#Password").type(pwd)
            cy.get(".button-1.login-button").click()
        }, {
            cacheAcrossSpecs: true
        })
    }

    static loginforValidation(email, pwd) {
        cy.get("#Email").type(email)
        cy.get("#Password").type(pwd)
        cy.get(".button-1.login-button").click()
    }

    static forgotPassword(){
        //validation
        cy.get(".button-1.password-recovery-button").click()
        cy.get("#Email-error").should("contain.text", "Enter your email")

        cy.get(".email").type("test.com")
        cy.get(".button-1.password-recovery-button").click()
        cy.get("#Email-error").should("have.text", "Wrong email")

        cy.get(".email").clear().type("test11111@gmail.com")
        cy.get(".button-1.password-recovery-button").click()
        cy.get(".content").should("have.text", "Email not found.")

        cy.fixture('example').then((userData) => {

            cy.get(".email").clear().type(userData.email)
        })
        cy.get(".button-1.password-recovery-button").click()
        cy.get(".content").should("have.text", "Email with instructions has been sent to you.")
    }
}