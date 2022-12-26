describe('vendor delete test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
    });
    it('selects Test Vendor', () => {
    cy.contains('Test Mkt').click();
    });
    it('clicks the delete button', () => {
    cy.get('button').contains('Delete').click();
    });
    it("clicks the dialog's Yes button", () => {
        cy.get('button').contains('Yes').click();
    });
    it('confirms delete', () => {
    cy.contains('deleted!');
    });
    });