/// <reference types="Cypress"/>

describe('API Functional Test: Login', () => {
    it('Should return 200 to success login', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.body.authorization).not.be.null
        })
    });

    it('Should return 401 for invalid password', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "fulano@qa.com",
                "password": "invalid_password"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
            expect(response.body.authorization).not.exist
        })
    });

    it('Should return 401 for invalid username', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "invalid_username@qa.com",
                "password": "teste"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
            expect(response.body.authorization).not.exist
        })
    });
});