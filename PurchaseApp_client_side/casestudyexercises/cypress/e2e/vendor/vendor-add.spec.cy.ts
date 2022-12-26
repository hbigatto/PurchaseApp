describe('vendor add test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button vendor option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
    });
    it('clicks add icon', () => {
    cy.contains('control_point').click();
    });
    it('fills in fields', () => {
    cy.get('input[formcontrolname=name').type('Test Mkt');
    cy.get('input[formcontrolname=address1').type('5 Nobody street');
    cy.get('input[formcontrolname=city').type('Toronto');
    cy.get('mat-select[formcontrolname="province"]').click();
    cy.get('mat-option').contains('Ontario').click();
    cy.get('input[formcontrolname=postalcode').type('N4S-0N3');
    cy.get('input[formcontrolname=phone').type('(555)555-1234');
    cy.get('mat-select[formcontrolname="type"]').click();
    cy.get('mat-option').contains('Trusted').click();
    cy.get('input[formcontrolname=email').type('tm@here.com');
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    cy.wait(500);
    });
    it('confirms add', () => {
    cy.contains('added!');
    });
    });

    /*
    name: FormControl;
    address1: FormControl;
    city: FormControl;
    province: FormControl;
    postalcode: FormControl;
    phone: FormControl;
    type: FormControl;
    email: FormControl;
    */
