Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('ignoreNextRedirectError', () => {
  cy.on('uncaught:exception', err => {
    if (err.message.includes('NEXT_REDIRECT')) {
      // NEXT_REDIRECT가 동작하는지 확인
      expect(err.message.includes('NEXT_REDIRECT')).equal(true);
      return false;
    }

    return true;
  });
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

Cypress.Commands.add('checkMyFeedCategoryActive', activeColor => {
  cy.getBySel('my-feed-nav').should('have.css', 'color', activeColor);
});

Cypress.Commands.add('checkTagCategoryActive', activeColor => {
  cy.getBySel('tag-feed-nav').should('have.css', 'color', activeColor);
});
