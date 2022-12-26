describe('vendor update test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
    });
    it('selects Test, Vendor', () => {
    cy.contains('Test Mkt').click();
    });
    it('updates email', () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('ts@testing.ca');
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    });
    it('confirms update', () => {
    cy.contains('updated!');
    });
    });