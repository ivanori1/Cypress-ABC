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
    // Please tell developers not to call this data-name undefined 
    cy.get('[data-name="undefined"]')
    .should('be.visible')

})

/*
Command take variable navigation that is saved as constant
in spec.js file click on that and asert drop-menu is visible
*/
Cypress.Commands.add('assertNavSelected', (navigation) => {
    cy.get('#hatConfigurator > ul > li > div')
        .contains(navigation)
        .click()
    cy.get('ul[class="nav nav-tabs nav-tabs-secondary nav-tabs-theme"]')
        .should('be.visible')
})
/*
Command check navigation bar menu (hamburger icon) and click on it
P.S not sure why developers set class colapsed when menu is not colapssed
After clicking it assert thet list in hamburger menu have 3 items
*/
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

/*
His comand click on Save design button whitin navigation bar
Then check is Save design pop-up visible
*/
Cypress.Commands.add('clickSaveDesignBtn', () => {
    cy.get('nav').within(() => {

        cy.get('[title="Spara din design"]')
        .click()
    })
    cy.get('.modal-content')
    .should('be.visible')
})
/*
This command test email input and error message in it
1 test case: empty text input
2 test case wrong email format
*/
Cypress.Commands.add('saveDesignNegative', () => {
    cy.get('.modal-content .btn-primary')
        .click()
    cy.get('.invalid-feedback').should('contain', 'Fältet E-post har inte ifyllts.')
    cy.get('[name="email"]')
        .type('1')
        .should('have.class', 'is-invalid')
    cy.get('.invalid-feedback').should('contain', 'E-post har fel format.')

})

/*
Command gives email variable from spec.js file and click on save btn
*/
Cypress.Commands.add('saveDesignPositive', (email) => {
    cy.get('[name="email"]')
    .type('{backspace}')
        .type(email)
    cy.get('.modal-content .btn-primary')
        .click()
    cy.get('.modal-content .btn-secondary')
        .click()
})
/*
This command is creating simple hat
clicking on [Create] button
typing text on front of hat
*/
Cypress.Commands.add('designHat', (left, right) => {
    cy.get('[data-name="undefined"] .btn-primary')
        .click()
    cy.get('[data-name="frontEmbroidery"] h3')
        .should('contain', 'Brodyr framsida')
    cy.get('[class="form-control input-left"]')
        .type('Srbija')
        .should('have.value', left)
    cy.get('[class="form-control input-right"]')
        .type(right)
        .should('have.value', right)
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
Cypress.Commands.add('completeOrderNegative', (email) => {
    cy.get('.btn-primary')
        .click()
    cy.get('.is-invalid').should('have.length', 9)
   cy.get('[type="email"]').should('have.value', email)
})