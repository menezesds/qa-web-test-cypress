/// <reference types="Cypress"/>
describe('Functional Test: Login', () => {
    it('Should redirect to products page after successul login with correct username and password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
        cy.get('.title').should('contain', 'Product')
    });
    it('Should return failure when logging in with invalid username and password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("invalid_user")
        cy.get('[data-test="password"]').type("invalid_password")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    it('Should return failure when logging in with invalid password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("invalid_password")
        cy.get('[data-test="login-button"]').click()
        cy.get('.error-message-container').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    it('Should return failure when logging in with empty password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="login-button"]').click()
        cy.get('.error-message-container').should('contain', 'Epic sadface: Password is required')
    });
    it('Should return failure when logging in with empty username and password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="login-button"]').click()
        cy.get('.error-message-container').should('contain', 'Username is required')
    });
    it('Should return failure when logging in with empty username', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('.error-message-container').should('contain', 'Username is required')
    });
});