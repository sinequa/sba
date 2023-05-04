describe('components/slide-builder testing', () => {
  it('Can access the Slide Builder page', () => {
    cy.visit('components/slide-builder')
  })
  it('Has slide builder working', () => {
    cy.visit('components/slide-builder')
    cy.get('doc-slide-list').get('sq-slide-list').get('sq-slide-tile')
    // slide builder should not have any slides yet
    cy.get('doc-slide-builder').get('sq-slide-builder').get('sq-selection-arranger').get('.cdk-drag').should('not.exist')
    // click on the slide tiles to add them to the builder
    cy.get('sq-slide-tile').click({multiple: true})
    // builder should now have the slides
    cy.get('doc-slide-builder').get('sq-slide-builder').get('sq-selection-arranger').get('.cdk-drag')
  })
})