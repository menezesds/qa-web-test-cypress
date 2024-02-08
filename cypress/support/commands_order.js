/// <reference types="Cypress"/>

Cypress.Commands.add('add_product_to_the_bag', (products) => {
    for (let i = 0; i < products.length; i++) {
        cy.contains(products[i]).click()
        cy.get('.btn_primary').click()
        cy.get('.btn_secondary.back').click()
    }
})

Cypress.Commands.add('fill_user_data', (firstName, lastName, postalCode) => {
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
})

Cypress.Commands.add('order_products_cart_validation', (products) => {
    let elemento = "";
    let product = "";
    for (let i = 0; i < products.length; i++) {
      let objeto = products[i];
      let chave = Object.keys(objeto)[0];
      let valor = objeto[chave];
      elemento = ".cart_list > :nth-child(" + chave + ")";
      product = valor;
    }

    cy.get(elemento).should('contain', product)
})

Cypress.Commands.add('order_products_inventory_validation', (products) => {
    let elemento = "";
    let product = "";
    for (let i = 0; i < products.length; i++) {
      let objeto = products[i];
      let chave = Object.keys(objeto)[0];
      let valor = objeto[chave];
      elemento = ":nth-child("+ chave + ") > .inventory_item_description";
      product = valor;
    }

    cy.get(elemento).should('contain', product)
})

Cypress.Commands.add('summary_info_validation', (products) => {
    let elemento = "";
    let information = "";
    for (let i = 0; i < products.length; i++) {
      let objeto = products[i];
      let chave = Object.keys(objeto)[0];
      let valor = objeto[chave];
      elemento = ".summary_info > :nth-child("+ chave + ")";
      information = valor;
    }

    cy.get(elemento).should('contain', information)
})