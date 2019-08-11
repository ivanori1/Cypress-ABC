/**
 * Main spec called Smoke Test that contains various test cases
 * inside of context (Test case groups)
 * cy. calls commands from support/comands.js 
 */

describe('Smoke Test', () => {

  before(() => {
    // it is only call visti '/' because default url is set in cypres.json
    cy.visit('/')
  })

  context('Design Page', () => {


    it('Assert Configurator with navigation, viewpoint, 3D hat and container-nav is loaded', () => {
      cy.assertConfiguratorLoaded();

    })
    it('Assert Length of nav buttons is 5 and DesignForslag is selected', () => {
      cy.assertDesignForslagSelected();
    })
    it('Check navigation button hamburger and their dropdown select', () => {
      cy.checkNavBarMain();
    })
    it('Click on selected navigation button', () => {
      cy.fixture('buttons').as('buttonsFixture')
      cy.get('@buttonsFixture').then(button => {
        cy.assertNavSelected(button.navigation[1])
        cy.assertNavSelected(button.navigation[2])
        cy.assertNavSelected(button.navigation[3])
        cy.assertNavSelected(button.navigation[4])
      })

    })
    it('Save Design ID to mail', () => {
      cy.clickSaveDesignBtn();
      cy.saveDesignNegative();
      cy.saveDesignPositive();
    })
    it('Design a Hat', () => {
      cy.designHat();
    })

  });

  context('Checkout Page', () => {
    it('Checkout', ()=> {
      cy.checkOut()
    })

    it('Select First Available Size of hat', () => {
      cy.selectSize();
    })
    it('Confirm the order', () => {
        cy.completeOrderNegative();
      })
    })
});