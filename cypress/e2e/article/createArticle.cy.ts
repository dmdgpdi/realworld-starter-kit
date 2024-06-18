describe('create article with login', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.visit('/');
    cy.login(email, password);
    cy.getBySel('create-article-button').click();
    cy.url().should('include', '/editor');
  });

  it('create article', () => {
    const title = `Test Article ${Date.now()}`;
    cy.getBySel('title-input').type(title);
    cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
    cy.getBySel('body-input').type(`it it just body`);
    cy.getBySel('tag-testTag').click();

    cy.getBySel('submit-button').click();

    cy.getBySel('article-list')
      .children()
      .filter(`:contains(${title})`)
      .should('be.visible');
  });

  it('create article with duplicated title', () => {
    const title = 'duplicated title';
    cy.getBySel('title-input').type(title);
    cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
    cy.getBySel('body-input').type(`it it just body`);
    cy.getBySel('tag-testTag').click();

    cy.getBySel('submit-button').click();

    cy.getBySel('error-messages').should('not.be.empty');
  });

  describe('when do not enter input', () => {
    it('without title input', () => {
      cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('body-input').type(`it it just body`);
      cy.getBySel('tag-testTag').click();

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });

    it('without description input', () => {
      cy.getBySel('title-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('body-input').type(`it it just body`);
      cy.getBySel('tag-testTag').click();

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });

    it('without body input', () => {
      cy.getBySel('title-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('tag-testTag').click();

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });

    it('without select tag input', () => {
      cy.getBySel('title-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('body-input').type(`it it just body`);

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });
  });
});

it('access url without login', () => {
  cy.ignoreNextRedirectError();

  cy.visit('/editor');

  cy.url().should('not.include', '/editor');
});
