/**
 * The support/commands.js is file where all separated commands are placed
 * Cypress.Commands.add() create new function that could be call and reuse
 * multiple time in any integration/spec.js file
 */

/*
Command for verifiying every element visiblity in home-page
 method get CSS (from fixture/locators.json) and should assert it is visible
*/


Cypress.Commands.add('assertConfiguratorLoaded', () => {
    cy.fixture('locators').as('locatorFixture')
    cy.get('@locatorFixture').then(locator => {
        cy.get(locator.wholePageConfigurator)
            .should('be.visible')
        cy.get(locator.hatConfigurator)
            .should('be.visible')
        cy.get(locator.hatConfiguratorNavButtonsList)
            .should('be.visible')
        cy.get(locator.hatConfiguratorViewPort)
            .should('be.visible')
        cy.get(locator.footerPanelNavigation)
            .should('be.visible')
        cy.get(locator.hat3Danimation)
            .should('be.visible')
    })

})
/*
 Command takes list under nav tag of hat confiurator and check
is there 5 navigation buttons, also check is default Design selected
*/

Cypress.Commands.add('assertDesignForslagSelected', () => {
    cy.fixture('locators').as('locatorFixture')
    cy.get('@locatorFixture').then(locator => {

        cy.get(locator.hatConfiguratorNavButtonsEach).
            should('have.length', 5)
        cy.get(locator.hatConfiguratorNavButtonsEach)
            .first()
            .should('have.class', 'active')
            .should('contain', 'Designförslag')
        // Please tell developers not to call this data-name undefined 
        cy.get('[data-name="undefined"]')
            .should('be.visible')

    })
})

/*
Command take variable navigation that is saved as constant
in spec.js file click on that and asert drop-menu is visible
*/
Cypress.Commands.add('assertNavSelected', (navigation) => {
    cy.fixture('locators').as('locatorFixture')
    cy.get('@locatorFixture').then(locator => {

        cy.get(locator.hatConfiguratorNavButtonTitle)
            .contains(navigation)
            .click()
        cy.get(locator.hubConfiguratorNavButtonDropDown)
            .should('be.visible')
        cy.get(locator.hatConfiguratorNavButtonTitle)
            .contains(navigation)
            .click()
    })
})
/*
Command check navigation bar menu (hamburger icon) and click on it
P.S not sure why developers set class colapsed when menu is not colapssed
After clicking it assert thet list in hamburger menu have 3 items
*/
Cypress.Commands.add('checkNavBarMain', () => {
    cy.get('nav').within(() => {
        cy.fixture('locators').as('locatorFixtures')
        cy.get('@locatorFixtures').then(locator => {
            cy.get(locator.hamburgerNavButton)
                .click()
                .should('not.have.class', 'collapsed')
            cy.get(locator.hamburgerDropdown)
                .should('have.class', 'show')
            cy.get(locator.hamburgerDropdownList)
                .should('have.length', 3)
        })

    })
})

/*
His comand click on Save design button whitin navigation bar
Then check is Save design pop-up visible
*/
Cypress.Commands.add('clickSaveDesignBtn', () => {
    cy.fixture('locators').as('locatorFixture')
    cy.get('@locatorFixture').then(locator => {
        cy.get('nav').within(() => {

            cy.get(locator.saveDesignNavButton)
                .click()
        })
        cy.get(locator.popUp)
            .should('be.visible')

    })

})
/*
This command test email input and error message in it
1 test case: empty text input
2 test case wrong email format
*/
Cypress.Commands.add('saveDesignNegative', () => {

    cy.fixture('locators').as('fixtureLocator')
    cy.get('@fixtureLocator').then(locator => {
        cy.get(locator.popUpConfirmButton)
            .click()
        cy.get(locator.inputError)
            .should('contain', 'Fältet E-post har inte ifyllts.')
        cy.get('[name="email"]')
            .should('have.class', 'is-invalid')
            .type('1')
            .should('have.class', 'is-invalid')
        cy.get(locator.inputError).should('contain', 'E-post har fel format.')
    })

})

/*
Command gives email variable from fixture/user.json file and click on save btn
*/

Cypress.Commands.add('saveDesignPositive', () => {
    // Fixture is set in fixture/user.json : Tester can change data there
    cy.fixture('user').as('userFixture')
    cy.get('@userFixture').then(user => {

        cy.get('[name="email"]')
            .type('{backspace}')
            .first()
            .type(user.email)
        cy.get('.modal-content .btn-primary')
            .click()
        cy.get('.modal-content .btn-secondary')
            .click()
    })
})
/*
This command is creating simple hat
clicking on [Create] button
typing text on front of hat
*/
Cypress.Commands.add('designHat', () => {
    cy.fixture('design').as('designFixture')
    cy.get('@designFixture').then(design => {

        cy.get('[data-name="undefined"] .btn-primary')
            .click()
        cy.get('[data-name="frontEmbroidery"] h3')
            .should('contain', 'Brodyr framsida')
        cy.get('[class="form-control input-left"]')
            .type('Srbija')
            .should('have.value', design.front.embroidery.left)
        cy.get('[class="form-control input-right"]')
            .type(design.front.embroidery.right)
            .should('have.value', design.front.embroidery.right)
    })
})

/*
This comand click on shoping card, in chlothes
click again on checkout button and assert url conatins checkout
*/
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

/*
Select first available size
and assert specific size button is active (have red border)
*/
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
/*
Click on Confirm order when requred data is empty
Use fixture data to assert that previously used email
is auto filled
*/
Cypress.Commands.add('completeOrderNegative', () => {
    cy.fixture('user').as('userFixture')
    cy.get('.btn-primary')
        .click()
    cy.get('.is-invalid').should('have.length', 9)
    cy.get('@userFixture').then(user => {
        cy.get('[type="email"]').should('have.value', user.email)
    cy.get('[name="className"]').should('be.disabled')
    })
})
