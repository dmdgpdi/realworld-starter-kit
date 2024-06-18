describe('read article', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.visit('/');
  });

  it('read article without login', () => {
    cy.getBySel('article-list').children().first().click();

    cy.url().should('include', 'article');
    cy.getBySel('article-title').should('be.visible');
    cy.getBySel('user-profile-link').should('be.visible');
    cy.getBySel('article-update-button').should('not.exist');
    cy.getBySel('article-delete-button').should('not.exist');
  });

  it('read article with login', () => {
    cy.login(email, password);
    cy.getBySel('profile-button').click();
    cy.url().should('include', '/profile');
    cy.getBySel('user-favorite-article-nav').click();
    cy.url().should('include', '/favorited');

    cy.getBySel('article-list').children().first().click();

    cy.url().should('include', 'article');
    cy.getBySel('article-title').should('be.visible');
    cy.getBySel('user-profile-link').should('be.visible');
    cy.getBySel('article-update-button').should('not.exist');
    cy.getBySel('article-delete-button').should('not.exist');
  });

  it('read my article with login', () => {
    cy.login(email, password);
    cy.getBySel('profile-button').click();
    cy.url().should('include', '/profile');

    cy.getBySel('article-list').children().first().click();

    cy.url().should('include', 'article');
    cy.getBySel('article-title').should('be.visible');
    cy.getBySel('user-profile-link').should('be.visible');
    cy.getBySel('article-update-button').should('be.visible');
    cy.getBySel('article-delete-button').should('be.visible');
  });
});
