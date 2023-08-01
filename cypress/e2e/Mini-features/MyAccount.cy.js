import {Login} from "../../misc/page-objects/Login_Registration/Login";

describe('My Account tests', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
    })

    it('check and compare the user details', function () {
        cy.visit("https://demo.nopcommerce.com/customer/info")

        cy.fixture('user').then((userData) => {
            cy.get("#FirstName").should("have.value", userData.first)
            cy.get("#LastName").should("have.value", userData.last)
            cy.get("[name='DateOfBirthDay']").should("have.value", userData.birthday)
            cy.get('[name="DateOfBirthMonth"]').should("contain.text",userData.month)
            cy.get('[name="DateOfBirthYear"]').should("have.value", userData.year)
            cy.get("#Email").should("have.value", userData.email)
            cy.get("#Company").should("have.value", userData.company)
        })
    });
});