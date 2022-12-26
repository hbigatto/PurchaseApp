describe('product add test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button products option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'products').click();
    });
    it('clicks add icon', () => {
    cy.contains('control_point').click();
    });
    it('fills in fields', () => {
    cy.get('input[formcontrolname=id]').type('09X88');
    cy.get('mat-select[formcontrolname="vendorid"]').click(); // open the list
    cy.get('mat-option').should('have.length.gt', 0); // wait for options
    cy.contains('Shady Sams').click();
    
    cy.get('input[formcontrolname=name]').type('Tire');
    cy.get('input[formcontrolname=msrp]').clear().type('129.99');
    cy.get('input[formcontrolname=costprice]').clear().type('100.00').click();
    });

    it('clicks expand icon', () => {
        cy.contains('Inventory Information').click();
    });

    it('fills remaining fields', () => {

        cy.get('input[formcontrolname=rop]').clear().type('10').click();
        cy.get('input[formcontrolname=eoq]').clear().type('7').click();
        cy.get('input[formcontrolname=qoh]').clear().type('3').click();
        cy.get('input[formcontrolname=qoo]').clear().type('5').click();

    });    
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    });
    it('confirms add', () => {
    cy.contains('updated!');
    });
   });