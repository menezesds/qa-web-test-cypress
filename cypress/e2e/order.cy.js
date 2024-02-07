/// <reference types="Cypress"/>
describe('E2E Test: Order', () => {
    it('Order with success flow', () => {
        //Login
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        
        //Sort product by price
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
        cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_description').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_description').should('contain', 'Sauce Labs Bolt T-Shirt')

        //Add product to the bag
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('.btn_secondary.back').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('.btn_secondary.back').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('.btn_secondary.back').click()

        cy.get('.shopping_cart_link').should('have.text', 3).click()

        cy.get('.cart_list > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
        cy.get('.cart_list > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
        cy.get('.cart_list > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')

        cy.get('.btn_action').should('have.text', 'Checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')

        cy.get('[data-test="firstName"]').type('João')
        cy.get('[data-test="lastName"]').type('de Santo Cristo')
        cy.get('[data-test="postalCode"]').type(30470101)

        cy.get('#continue').click()

        cy.get('.title').should('have.text', 'Checkout: Overview')

        cy.get('.cart_list > :nth-child(3)').should('contain', 'Sauce Labs Onesie')
        cy.get('.cart_list > :nth-child(4)').should('contain', 'Sauce Labs Bike Light')
        cy.get('.cart_list > :nth-child(5)').should('contain', 'Sauce Labs Bolt T-Shirt')
        cy.get('.summary_info > :nth-child(1)').should('contain', 'Payment Information')
        cy.get('.summary_info > :nth-child(2)').should('contain', 'SauceCard')
        cy.get('.summary_info > :nth-child(3)').should('contain', 'Shipping Information')
        cy.get('.summary_info > :nth-child(4)').should('contain', 'Free Pony Express Delivery!')
        cy.get('.summary_info > :nth-child(5)').should('contain', 'Price Total')
        cy.get('.summary_info > :nth-child(6)').should('contain', 'Item total')
        cy.get('.summary_info > :nth-child(7)').should('contain', 'Tax')
        cy.get('.summary_total_label').should('contain', 'Total: $36.69')
        
        cy.get('#finish').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
        cy.get('.pony_express').should('be.visible')
        cy.get('.complete-text').should('be.visible')
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('#back-to-products').should('have.text', 'Back Home').click()
    });

});