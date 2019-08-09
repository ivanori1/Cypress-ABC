// Command for verifiying every element visiblity in home-page

Cypress.Commands.add('assertConfiguratorLoaded', () => {
    cy.get('[data-name="configurator"]').should('be.visible')
    cy.get('#hatConfigurator').should('be.visible')
    cy.get('#hatConfigurator [class="nav nav-tabs nav-tabs-theme"]').should('be.visible')
    cy.get('.viewport').should('be.visible')
    cy.get('nav [class="container-fluid"]').should('be.visible')
    cy.get('[class="nav-panel mb-3"]').should('be.visible')
    cy.get('.hat3D').should('be.visible')
    
})

Cypress.Commands.add('assertDesignForslagSelected', () => {
    cy.get('#hatConfigurator > .nav > li').should('have.length', 5)
    cy.get('#hatConfigurator > ul > li:first')
        .should('have.class', 'active')
        .should('contain', 'Designförslag')

})

Cypress.Commands.add('assertNavSelected', (navigation) => {
    cy.get('#hatConfigurator > ul > li')
        .should('contain', navigation)
        .should('have.class', 'active')


})
