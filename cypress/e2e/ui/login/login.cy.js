/// <reference types="Cypress"/>
describe('UI Functional Test: Login', () => {
    it('Should redirect to products page after successul login with correct username and password', () => {
        cy.login_test('standard_user', 'secret_sauce')
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('.title').should('contain', 'Product')
    });
    it('Should return failure when logging in with invalid username and password', () => {
        cy.login_test('invalid_user', 'invalid_password')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    it('Should return failure when logging in with invalid password', () => {
        cy.login_test('standard_user', 'invalid_password')
        cy.get('.error-message-container').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    it('Should return failure when logging in with empty password', () => {
        cy.login_test('standard_user', '')
        cy.get('.error-message-container').should('contain', 'Epic sadface: Password is required')
    });
    it('Should return failure when logging in with empty username and password', () => {
        cy.login_test('', '')
        cy.get('.error-message-container').should('contain', 'Username is required')
    });
    it('Should return failure when logging in with empty username', () => {
        cy.login_test('', 'secret_sauce')
        cy.get('.error-message-container').should('contain', 'Username is required')
    });
});