import {Login} from "./Login";

export default class DesktopPage{
    // Select Category
    static goToPage(name){
        cy.get(`.top-menu.notmobile a[href="/${name}"]`).click()
    }
    //Directly go to subcategory
    static directSubCategory(cat, subcat){
        cy.get(`.top-menu.notmobile a[href="/${cat}"]`).click()
        cy.contains('.category-grid .title a', `${subcat}`).click();
    }
    // select sort by
    static sortBy(filter){
        cy.get("#products-orderby").select(filter)
    }

    static quantityCheck() {
        cy.get(".cart-qty").invoke('text')
            .then((s) => {
                const start = s.indexOf('(')
                const end = s.indexOf(')', start)
                return s.slice(start+1, end)
            }).then(parseInt).should('be.a', 'number').as("num")

        cy.get('@num').then((preCount) => {
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${preCount})`)

            const quantity = preCount+1
            cy.get("#topcartlink").should("contain.text", `Shopping cart (${quantity})`)
        })
    }
    dsfafds

    static sortArray(attr, typeOfSort){
        cy.get(`.product-${attr} > a`)
            .then(($productInfos) => {
                const productInfoArray = Array.from($productInfos, (el) => el.innerText.trim());
                const sortedProductInfos = productInfoArray.sort()
                expect(sortedProductInfos).to.deep.equal(productInfoArray);
            })
        cy.get(`.product-${attr} > a`)
            .then(($productInfos) => {
                const productInfoArray = Array.from($productInfos, (el) => el.innerText.trim());
                const sortedProductInfos = productInfoArray.reverse()
                expect(sortedProductInfos).to.deep.equal(productInfoArray);
            })
    }
    static sortArrayForPrice(attr, typeOfSort){
        typeOfSort === "sort" ?
            cy.get(`.product-${attr} > a`)
                .then(($productInfos) => {
                    const productInfoArray = Array.from($productInfos, (el) => el.innerText.trim());
                    const sortedProductInfos = productInfoArray.sort()
                    expect(sortedProductInfos).to.deep.equal(productInfoArray);
                }) :
            cy.get(`.product-${attr} > a`)
                .then(($productInfos) => {
                    const productInfoArray = Array.from($productInfos, (el) => el.innerText.trim());
                    const sortedProductInfos = productInfoArray.reverse()
                    expect(sortedProductInfos).to.deep.equal(productInfoArray);
                });
    }

    static checkInCart() {
        cy.get(".cart-label").click()

        cy.get('.cart tbody tr').within(() => {
            cy.fixture("product").then((expectedProduct) => {
                cy.get('.product-name').should('have.text', expectedProduct.name);
                cy.get('.product-unit-price').should('have.text', expectedProduct.price);
            })
        })
    }
}
