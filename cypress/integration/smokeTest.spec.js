describe('smokeTest', () => {
  before(() => {
    cy.visit('/')
  })
  context('Design Page', () => {
    const Design = "Framsidan"
    it('Assert Configurator with navigation, viewpoint, 3D hat and container-nav is loaded', () => {
      cy.assertConfiguratorLoaded();
    })
    it('Assert Length of nav buttons is 5 and DesignForslag is selected', () => {
      cy.assertDesignForslagSelected();
    })
    it ('Check navigation button hamburger and their dropdown select', ()=> {
      cy.checkNavBarMain();
    })
  })
})