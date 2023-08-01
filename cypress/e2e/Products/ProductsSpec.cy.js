import {Login} from "../../misc/page-objects/Login_Registration/Login";
import P_categories from "../../misc/page-objects/P_categories";
import ProductSpec from "../../misc/page-objects/Products/ProductSpec";

describe('Desktop Products', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("computers", "Desktop")
    })

    // Negative tests
    it('should give error for incorrect inputs', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-1").click()
        cy.get('.bar-notification.error p').contains("Please select RAM").should("be.visible")
        cy.get('.bar-notification.error p').contains("Please select HDD").should("exist")
        // Processor error
        cy.get('select#product_attribute_1').select("0")
        cy.get("#add-to-cart-button-1").click()
        cy.get('.bar-notification.error p').contains("Please select Processor").should("be.visible")
    });

    it('should check each individual options from the dropdown lists', function () {
        // Processor 1 or 2 // RAM 3 4 5
        // HDD 6 or 7 for hdd // OS 8 or 9 for os
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        ProductSpec.dropDownInput("1", "3", "6", "8")
        // Fails the test selecting 7 does not work
        // Desktop.dropDownInput("2", "4", "7", "9")
        ProductSpec.dropDownInput("2", "4", "6", "8")
        ProductSpec.dropDownInput("1", "5", "6", "8")
    });

    // Positive tests
    it('should automate a successful form filling', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        ProductSpec.fillUpDetails(5)
        ProductSpec.AddToCart(5)
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });
});

describe('Notebook Products', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("computers", "Notebook")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
    })

    // Negative tests
    it('should give error for incorrect inputs', function () {
        cy.get("#product_enteredQuantity_4").clear().type("0")
        cy.get("#add-to-cart-button-4").click()
        cy.get('.bar-notification.error p').contains("Quantity should be positive").should("be.visible")
        cy.get("#product_enteredQuantity_4").clear().type("1")
        cy.get("#add-to-cart-button-4").click()
        cy.get('.bar-notification.error p').contains("The minimum quantity allowed for purchase is 2.").should("be.visible")
    });

    // Positive tests
    it('should automate a successful form filling', function () {
        cy.get("#product_enteredQuantity_4").clear().type("2")
        cy.get("#add-to-cart-button-4").click()
        cy.get('.bar-notification.success p').contains("The product has been added to your ").should("be.visible")
    });
});

describe('Camera Products', function () {
    beforeEach(function (){
        cy.fixture('example').then((userData) => {
            Login.login(userData.email,'123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("electronics", "Camera")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
    })

    // Positive tests
    it('should automate a successful form filling', function () {
        cy.get(".variant-name").should("contain.text", "Nikon D5500 DSLR - Black")
        cy.get("#product_enteredQuantity_14").clear().type("2")
        cy.get("#add-to-cart-button-14").click()
        cy.get('.bar-notification.success p').contains("The product has been added to your ").should("be.visible")

        cy.get(".variant-name").should("contain.text", "Nikon D5500 DSLR - Red")
        cy.get("#product_enteredQuantity_15").clear().type("2")
        cy.get("#add-to-cart-button-15").click()
        cy.get('.bar-notification.success p').contains("The product has been added to your ").should("be.visible")
    });
});

describe('Shoe Product', function () {
    beforeEach(function () {
        cy.fixture('example').then((userData) => {
            Login.login(userData.email, '123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("apparel", "Shoes")
    })

    // Adidas Shoes
    it('should give error for incorrect inputs', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-25").click()
        cy.get('.bar-notification.error p').contains("Please select Size").should("be.visible")
    })

    it('should automate a successful form filling', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.get('#product_attribute_9').select("21")
        cy.get('.selected-value > label > .attribute-square-container > .attribute-square').click()
        cy.get("#product_enteredQuantity_25").clear().type("1")
        cy.get("#add-to-cart-button-25").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });

    it('should give error for incorrect inputs', function () {
        cy.get('.product-item').eq(1).find('.product-box-add-to-cart-button').click();
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-24").click()
        cy.get('.bar-notification.error p').contains("Please select Size").should("be.visible")
        cy.get('.bar-notification.error p').contains("Please select Color").should("exist")
        cy.get('.bar-notification.error p').contains("Please select Print").should("exist")
    })

    it('should automate a successful form filling', function () {
        cy.get('.product-item').eq(1).find('.product-box-add-to-cart-button').click();
        cy.get('#product_attribute_6').select("13")
        cy.get('#product_attribute_7').select("17")
        cy.get('[data-attr-value="19"] > label > .attribute-square-container > .attribute-square').click()
        cy.get("#product_enteredQuantity_24").clear().type("1")
        cy.get("#add-to-cart-button-24").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });
})

describe('T-shirt Product', function () {
    beforeEach(function () {
        cy.fixture('example').then((userData) => {
            Login.login(userData.email, '123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("apparel", "Clothing")
    })

    // Custom T-Shirt
    it('should give error for incorrect inputs', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-29").click()
        cy.get('.bar-notification.error p').contains("Enter your text:").should("be.visible")
    })

    it('should automate a successful form filling', function () {
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
        cy.get('#product_attribute_12').type("Test Word")
        cy.get("#product_enteredQuantity_29").clear().type("1")
        cy.get("#add-to-cart-button-29").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });

    // Nike Tailwind
    it('should give error for incorrect inputs', function () {
        cy.get('.product-item').eq(2).find('.product-box-add-to-cart-button').click();
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-27").click()
        cy.get('.bar-notification.error p').contains("Please select Size").should("be.visible")
    })

    it('should automate a successful form filling', function () {
        cy.get('.product-item').eq(2).find('.product-box-add-to-cart-button').click();
        cy.get('#product_attribute_11').select("28")
        cy.get("#product_enteredQuantity_27").clear().type("1")
        cy.get("#add-to-cart-button-27").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });
})

describe('Accessories Product', function () {
    beforeEach(function () {
        cy.fixture('example').then((userData) => {
            Login.login(userData.email, '123456')
        })
        cy.visit("/")
        P_categories.directSubCategory("apparel", "Accessories")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
    })
    
    it('should give error for incorrect inputs', function () {
        cy.contains('button', 'Add to cart').click()
        cy.get("#add-to-cart-button-31").click()
        cy.get('.bar-notification.error p').contains("Please select Size").should("be.visible")
    })

    it('should automate a successful form filling', function () {
        cy.get('#product_attribute_13').select("34")
        cy.get("#product_enteredQuantity_31").clear().type("1")
        cy.get("#add-to-cart-button-31").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    });
})

describe('Digital Downloads', function () {
    beforeEach(function () {
        cy.fixture('example').then((userData) => {
            Login.login(userData.email, '123456')
        })
        cy.visit("/")
        P_categories.goToPage("digital-downloads")
    })

    it('Validation and Automation for Book 1', function () {
        // If You wait
        ProductSpec.checkMe(0,"0.1")
        cy.get('.bar-notification.error p').contains("The price must be from $0.50 to $100.00").should("be.visible")
        ProductSpec.checkMe(0,"100")
        cy.get('.content').contains("The product has been added to your").should("be.visible")

        // The Script
        ProductSpec.checkMe(2, "0")
        cy.get('.bar-notification.error p').contains("The price must be from $0.50 to $1,000.00").should("be.visible")
        ProductSpec.checkMe(2, "100")
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    })
})

describe('Jewelry Product', function () {
    beforeEach(function () {
        cy.fixture('example').then((userData) => {
            Login.login(userData.email, '123456')
        })
        cy.visit("/")
        P_categories.goToPage("jewelry")
        cy.get('.product-item').eq(0).find('.product-box-add-to-cart-button').click();
    })

    // Elegant Gemstone Necklace
    it('should give error for incorrect inputs', function () {
        cy.get("#add-to-cart-button-40").click()
        cy.get('.bar-notification.error p').contains("Enter rental start date").should("be.visible")
        cy.get("#rental_start_date_40").clear().type("8/3/2023")
        cy.get('.bar-notification.error p').contains("Enter rental end date").should("be.visible")
        ProductSpec.selectDate("7/1/2023", "7/3/2023")
        cy.get('.bar-notification.error p').contains("Rental start date should be the future date").should("be.visible")
        ProductSpec.selectDate("8/3/2023")
        ProductSpec.selectDate("7/31/2023")
        cy.get('.bar-notification.error p').contains("Rental start date should be less than end date").should("be.visible")
    })

    it('should automate a successful form filling', function () {
        ProductSpec.selectDate("11/1/2023", "11/4/2023")
        cy.contains("button", "Rent").click()
        cy.get('.content').contains("The product has been added to your").should("be.visible")
    })
})