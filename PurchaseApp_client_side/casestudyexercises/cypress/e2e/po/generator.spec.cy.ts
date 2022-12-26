describe('PO generator test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button generator option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'generator').click();
    });
    it('selects a vendor', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.contains('Hugo Market').click();
    });
    it('selects a product', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="productid"]').click();
    cy.contains('Axe').click();
    });
    it('selects a quantity', () => {
        cy.wait(500);
        cy.get('mat-select[formcontrolname="productqty"]').click();
        cy.contains('6').click();
        });
    it('clicks the save button', () => {
    });
    it('confirms PO added', () => {
    cy.contains('added');
    });
   });