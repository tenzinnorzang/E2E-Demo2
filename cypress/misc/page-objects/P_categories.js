export default class P_categories{
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

    static selectView(typeOfView){
        cy.get(`.viewmode-icon.${typeOfView}`).click();
    }

    //Check if the number gets incremented
    static topLinkCheck(attr) {
        const selector = attr === "cart" ? ".cart-qty" : ".wishlist-qty";
        cy.get(selector).invoke('text')
            .then((s) => {
                const start = s.indexOf('(')
                const end = s.indexOf(')', start)
                return s.slice(start+1, end)
            }).then(parseInt).should('be.a', 'number').as("num")

        cy.get('@num').then((preCount) => {
            cy.get(selector).should("contain.text", `(${preCount})`)
            const quantity = preCount+1
            cy.get(selector).should("contain.text", `(${quantity})`)
        })
    }

    static arraySort(attr, typeOfSort) {
        const selector = attr === "title" ? ".product-title > a" : ".price.actual-price";
        cy.get(selector).then(($productInfos) => {
            const productInfoArray = Array.from($productInfos, (el) => el.innerText.trim());
            const sortedProductInfos = typeOfSort === "sort" ? productInfoArray.sort() : productInfoArray.reverse();

            expect(sortedProductInfos).to.deep.equal(productInfoArray);
        });
    }

    // static checkInCart() {
    //     cy.get(".cart-label").click()
    //     cy.get('.cart tbody tr').within(() => {
    //         cy.fixture("product").then((expectedProduct) => {
    //             cy.get('.product-name').should('have.text', expectedProduct.name);
    //             cy.get('.product-unit-price').should('have.text', expectedProduct.price);
    //         })
    //     })
    // }
}
