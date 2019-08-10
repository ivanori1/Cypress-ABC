/**
 * The support/commands.js is file where all separted commands are placed
 * Cypress.Commands.add() create new function that could be call and reuse
 * multiple time in any integration/spec.js 
 */

 
/*
Command for verifiying every element visiblity in home-page
 method get take CSS and should assert it is visible
*/

Cypress.Commands.add('assertConfiguratorLoaded', () => {
    cy.get('[data-name="configurator"]')
        .should('be.visible')
    cy.get('#hatConfigurator')
        .should('be.visible')
    cy.get('#hatConfigurator [class="nav nav-tabs nav-tabs-theme"]')
        .should('be.visible')
    cy.get('.viewport')
        .should('be.visible')
    cy.get('[class="nav-panel mb-3"]')
        .should('be.visible')
    cy.get('.hat3D')
        .should('be.visible')

})
/*
 Command takes list under nav tag of hat confiurator and check
is there 5 navigation buttons, also check is default Design selected
*/

Cypress.Commands.add('assertDesignForslagSelected', () => {
    cy.get('#hatConfigurator > .nav > li').
        should('have.length', 5)
    cy.get('#hatConfigurator > ul > li:first')
        .should('have.class', 'active')
        .should('contain', 'Designförslag')

})


Cypress.Commands.add('assertNavSelected', (navigation) => {
    cy.get('#hatConfigurator > ul > li > div')
        .contains(navigation)
        .click()
    cy.get('ul[class="nav nav-tabs nav-tabs-secondary nav-tabs-theme"]')
        .should('be.visible')
})

Cypress.Commands.add('checkNavBarMain', () => {
    cy.get('nav').within(() => {
        cy.get('button[aria-controls="navbarMain"]')
            .click()
            .should('not.have.class', 'collapsed')
        cy.get('#navbarMain')
            .should('have.class', 'show')
        cy.get('#navbarMain li')
            .should('have.length', 3)
    })
})

Cypress.Commands.add('clickSaveBtn', () => {
    cy.get('[title="Spara din design"]')
        .click()
    cy.get('.modal-content')
        .should('be.visible')
})

Cypress.Commands.add('saveDesignNegative', () => {
    cy.get('.modal-content .btn-primary')
        .click()
    cy.get('.invalid-feedback').should('contain', 'Fältet E-post har inte ifyllts.')
    cy.get('[name="email"]')
        .type('123')
        .should('have.class', 'is-invalid')
    cy.get('.invalid-feedback').should('contain', 'E-post har fel format.')

})

Cypress.Commands.add('saveDesignPositive', () => {
    cy.get('[name="email"]')
        .type('abc@abc.abc')
    cy.get('.modal-content .btn-primary')
        .click()
    cy.get('.modal-content .btn-secondary')
        .click()
})

Cypress.Commands.add('designHat', () => {
    cy.get('[data-name="undefined"] .btn-primary')
        .click()
    cy.get('[data-name="frontEmbroidery"] h3')
        .should('contain', 'Brodyr framsida')
    cy.get('[class="form-control input-left"]')
        .type('Srbija')
        .should('have.value', 'Srbija')
    cy.get('[class="form-control input-right"]')
        .type('Do Tokija')
        .should('have.value', 'Do Tokija')
})

Cypress.Commands.add('checkOut', () => {
    cy.get('.shopping-cart-popover-target')
        .click()
    cy.get('.drop-content')
        .should('be.visible')
    cy.get('.drop-content .btn-primary')
        .click()
    cy.get('section[data-name="summary"]')
        .should('be.visible')
    cy.get('.btn-secondary')
        .contains('Gå vidare →')
        .click()
    cy.url()
        .should('eq', 'https://studentmossa.abcgruppen.se/#clothes')
    cy.get('[data-name=clothes] > div > div > div .btn-primary')
        .click()
    cy.url()
        .should('eq', 'https://studentmossa.abcgruppen.se/#checkout')
})


Cypress.Commands.add('selectSize', () => {
    cy.get('.btn-primary')
        .click()
    cy.get('[role="document"]')
        .should('be.visible')
    cy.get('.order-sm-1 li')
        .first()
        .click()
        .should('have.class', 'active')
    cy.get('.order-sm-1 .btn-primary')
        .click()

})

Cypress.Commands.add('completeOrderNegative', () => {
    cy.get('.btn-primary')
        .click()
    cy.get('.is-invalid').should('have.length', 9)
})