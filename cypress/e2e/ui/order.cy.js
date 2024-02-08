/// <reference types="Cypress"/>
describe('UI E2E Test: Order', () => {
    it('Order with success flow', () => {
        //Login
        cy.login_test('standard_user', 'secret_sauce')
        
        //Sort product by price
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
        cy.order_products_inventory_validation([{1: 'Sauce Labs Onesie'}, {2:'Sauce Labs Bike Light'}, {3: 'Sauce Labs Bolt T-Shirt'}])

        //Add product to the bag
        cy.add_product_to_the_bag(['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'])

        cy.get('.shopping_cart_link').should('have.text', 3).click()

        cy.order_products_cart_validation([{3: 'Sauce Labs Onesie'}, {4:'Sauce Labs Bike Light'}, {5: 'Sauce Labs Bolt T-Shirt'}])

        cy.get('.btn_action').should('have.text', 'Checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')

        cy.fill_user_data('João', 'de Santo Cristo',  30470101)

        cy.get('#continue').click()

        cy.get('.title').should('have.text', 'Checkout: Overview')

        cy.order_products_cart_validation([{3: 'Sauce Labs Onesie'}, {4:'Sauce Labs Bike Light'}, {5: 'Sauce Labs Bolt T-Shirt'}])
        
        cy.summary_info_validation([{1: 'Payment Information'}, {2: 'SauceCard'}, {3: 'Shipping Information'}, {4: 'Free Pony Express Delivery!'}, {5: 'Price Total'}, {6:'Item total'}, {7:'Tax'}])
        cy.get('.summary_total_label').should('contain', 'Total: $36.69')
        
        cy.get('#finish').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
        cy.get('.pony_express').should('be.visible')
        cy.get('.complete-text').should('be.visible')
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('#back-to-products').should('have.text', 'Back Home').click()
    });

});