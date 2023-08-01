export class ShoppingCart {

    static checkGiftWrap(val) {
        cy.get("#checkout_attribute_1").select(val)

    }
    static priceQtyCheck(){
        cy.get('.product-unit-price').invoke('text').then(priceText => {
            const price = parseFloat(priceText.slice(1).replace(',', ''));
            cy.get('.qty-input').invoke('val')
                .then(quantityValue => {
                    const quantity = parseInt(quantityValue);
                    cy.get('.product-subtotal').invoke('text').then(subtotalText => {
                        const subtotal = parseFloat(subtotalText.slice(1).replace(',', ''));
                        const expectedTotal = price * quantity;
                        expect(subtotal).to.equal(expectedTotal);
                    });
                });
        });
    }
    static removeItemCheck(){

        // Check if the item is initially present in the cart
        cy.contains('.product-name', 'Build your own computer').should('exist');
        cy.get('.remove-btn').click();

    }

    static amountCheck(){
        cy.get('.order-subtotal .value-summary')
            .invoke('text')
            .then(subtotalText => {
                const subtotal = parseFloat(subtotalText.slice(1).replace(',', ''));

                cy.get('.shipping-cost .value-summary')
                    .invoke('text')
                    .then(shippingText => {
                        const shipping = parseFloat(shippingText.slice(1).replace(',', ''));

                        cy.get('.tax-value .value-summary')
                            .invoke('text')
                            .then(taxText => {
                                const tax = parseFloat(taxText.slice(1).replace(',', ''));

                                cy.get('.order-total .value-summary strong')
                                    .invoke('text')
                                    .then(totalText => {
                                        const total = parseFloat(totalText.slice(1).replace(',', ''));

                                        const calculatedTotal = [subtotal, shipping, tax].reduce((acc, value) => acc + value, 0);
                                        expect(total).to.equal(calculatedTotal);
                                    });
                            });
                    });
            });
    }

    static checkOutValidation(){
        // Check if the checkbox is initially unchecked
        cy.get('#termsofservice').should('not.be.checked');
        cy.get('#checkout').click();
        cy.url().should('not.include', '/onepagecheckout');
        cy.get('.ui-dialog-content.ui-widget-content >p')
            .should('be.visible')
            .and('contain', 'Please accept the terms of service before the next step.');
        //cross button
        cy.get(".ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close").click()
    }

    static checkOutClick(){
        cy.get('#termsofservice').check();
        cy.get('#checkout').click();
        cy.url().should('include', '/onepagecheckout');
    }
}