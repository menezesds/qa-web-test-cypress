/// <reference types="Cypress"/>

Cypress.Commands.add('login_test', (username, password) => {
    cy.visit("https://www.saucedemo.com/")
    if(username != '') cy.get('[data-test="username"]').type(username)
    if(password != '') cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
})