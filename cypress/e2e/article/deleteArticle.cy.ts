describe('delete article', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.ignoreNextRedirectError();
    cy.login(email, password);
    cy.intercept('POST', '**/article/**').as('deleteArticle');
  });

  it('delete article', () => {
    let deleteArticleTitle;
    cy.getBySel('profile-button').click();
    cy.url().should('include', '/profile');
    cy.getBySel('article-list').children().first().click();
    cy.getBySel('article-title')
      .invoke('text')
      .then(text => {
        deleteArticleTitle = text;

        cy.getBySel('article-delete-button').click();

        cy.wait('@deleteArticle');
        cy.url().should('include', '/profile');
        cy.getBySel('article-list')
          .children()
          .filter(`:contains(${deleteArticleTitle})`)
          .should('not.exist');
      });
  });
});
