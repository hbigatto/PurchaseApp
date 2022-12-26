describe('product update test', () => {

    it('visits the root', () => {
        cy.visit('/');
    });

    it('clicks the menu button products option', () => {
        cy.get('mat-icon').click();
        cy.contains('a', 'products').click();
    });

    it('selects Tire product', () => {
        cy.contains('Tire').click();
    });

    it('updates amount', () => {
        cy.get("input[formcontrolname=msrp").clear();
        cy.get("input[formcontrolname=msrp").type('210.00');
    });

    it("clicks the save button", () => {
        cy.get("button").contains("Save").click();
        cy.wait(500);
    });

    it('confirms update', () => {
        cy.contains('updated!');
    });

});