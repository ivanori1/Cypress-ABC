/**
 * Main spec called smokeTest that contains various test cases
 * cy. calls commands from support/comands.js 
 */

describe('smokeTest', () => {
  // Navigation buttons
  const navFramsidan = "Framsidan"
  const navBaksidan = "Baksidan"
  const navInsidan = "Insidan"
  const navOvansidan = "Ovansidan"
  const email = "123@abc.gruppen"
  const leftInput = "Srbija"
  const rightInput = "Do Tokija"
  before(() => {
    // it is only '/' caled to visit because default url is set in cypres.json
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
      cy.assertNavSelected(navInsidan)
      cy.assertNavSelected(navFramsidan)
      cy.assertNavSelected(navBaksidan)
      cy.assertNavSelected(navOvansidan)
    })
    it('Save Design ID to mail', () => {
      cy.clickSaveDesignBtn();
      cy.saveDesignNegative();
      cy.saveDesignPositive(email);
    })
  })

  context('Checkout page', () => {

    it('Design and Checkout', () => {
      cy.designHat(leftInput, rightInput);
      cy.checkOut()
    })
    it('Select First Available Size of hat', () => {
      cy.selectSize();
      cy.completeOrderNegative(email);
    })
  })


});