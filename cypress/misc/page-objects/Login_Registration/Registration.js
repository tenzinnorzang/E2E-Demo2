import {generateMailosaurEmail, registrationDetails} from "../../utils";

export class Registration{
    static register(pwd, conpwd) {
        const email = generateMailosaurEmail()
        cy.writeFile('cypress/fixtures/example.json', {email: email})
        registrationDetails(email)
        cy.get("#Password").type(pwd)
        cy.get("#ConfirmPassword").type(conpwd)
        cy.get("#register-button").click()
    }
}
