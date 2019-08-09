// Comand for verifiying every element visiblity in home-page

Cypress.Commands.add('assertHomePage', () => {
    cy.visit('/')

})