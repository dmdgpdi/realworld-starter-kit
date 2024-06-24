describe('logout', () => {
  beforeEach(() => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');
    cy.login(email, password);
    cy.getBySel('setting-button').click();
  });

  it('logout', () => {
    cy.getBySel('logout-button').click();
    cy.getBySel('setting-button').should('not.exist');
  });
});
