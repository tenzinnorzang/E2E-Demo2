export default class Search{
    static changeCurrency(curr){
        cy.get("select#customerCurrency").select(curr)
    }
    static searchWord(word){
        cy.get("#small-searchterms").type(`${word}{enter}`)
    }
}