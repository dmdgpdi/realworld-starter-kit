describe('logout', () => {
  beforeEach(() => {
    cy.login('test3@gmail.com', '12345678');
    cy.getBySel('setting-button').click();
  });

  it('logout', () => {
    cy.getBySel('logout-button').click();
    cy.getBySel('setting-button').should('not.exist');
  });
});
