import {
    randCity,
    randCompanyName,
    randFirstName,
    randLastName, randMonth,
    randNumber,
    randStreetName,
    randZipCode
} from "@ngneat/falso";

export class User {
    fName = randFirstName();
    lName = randLastName();
    phone = `+97517${Math.floor(100000 + Math.random() * 900000)}`;
    mobileNo = `17${Math.floor(100000 + Math.random() * 900000)}`;
    comName = randCompanyName();
    streetName = randStreetName();
    streetNo = randNumber();
    city = randCity();
    zip = randZipCode();
    username = `test${Math.floor(Math.random() * (1000))}`
    birthDay = Math.floor(Math.random() * (30 - 1+1) + 1)
    month = randMonth()
    year = '1914'
}

const user = new User()
let emailAddress;

export function generateMailosaurEmail() {
    emailAddress = user.username+`@gmail.com`;
    return emailAddress;
}

export function registrationDetails(email){
    cy.get('#FirstName').type(user.fName)
    cy.get('#LastName').type(user.lName)
    cy.get('#Email').type(email)
    cy.get('#Company').type(user.comName)
    cy.get('[name="DateOfBirthDay"]').select(user.birthDay)
    cy.get('[name="DateOfBirthMonth"]').select(user.month)
    cy.get('[name="DateOfBirthYear"]').select(user.year)

    cy.writeFile('cypress/fixtures/user.json',
        {
            email: email,
            first: user.fName,
            last: user.lName,
            company: user.comName,
            birthday: user.birthDay,
            month: user.month,
            year: user.year
        })
}

export function checkOutDetails(){
    cy.get('#BillingNewAddress_Company').clear().type(user.comName)
    cy.get("#BillingNewAddress_CountryId").select("1")
    cy.get("#BillingNewAddress_StateProvinceId").select("1")
    cy.get("#BillingNewAddress_City").type(user.city)
    cy.get("#BillingNewAddress_Address1").type(user.streetName)
    cy.get("#BillingNewAddress_ZipPostalCode").type(user.zip)
    cy.get("#BillingNewAddress_PhoneNumber").type(user.phone)
    cy.get("#BillingNewAddress_FaxNumber").type("83847478393")
}