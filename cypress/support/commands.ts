Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.intercept({ url: '/login', method: 'POST' }).as('login');
  cy.getBySel('email-input').type(email);
  cy.getBySel('password-input').type(password);
  cy.getBySel('submit').click();
  cy.wait('@login');
  cy.visit('/');
});

Cypress.Commands.add('checkCurrentPage', (page: number) => {
  cy.getBySel('current-page')
    .invoke('text')
    .then(text => {
      const currentPageIndex = parseInt(text, 10);
      expect(currentPageIndex).equal(page);
    });
});

Cypress.Commands.add('checkGlobalCategoryActive', activeColor => {
  cy.getBySel('global-feed-nav').should('have.css', 'color', activeColor);
});
