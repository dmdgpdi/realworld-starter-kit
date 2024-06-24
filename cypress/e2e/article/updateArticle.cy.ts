describe('update article with login', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.ignoreNextRedirectError();
    cy.visit('/');
    cy.login(email, password);
    cy.getBySel('profile-button').click();
    cy.url().should('include', '/profile');
    cy.getBySel('article-list').children().first().click();
    cy.getBySel('article-update-button').click();
    cy.url().should('include', 'editor');
    cy.getBySel('title-input').clear();
    cy.getBySel('description-input').clear();
    cy.getBySel('body-input').clear();
  });

  it('update article', () => {
    const title = `Update Test Article ${Date.now()}`;
    cy.getBySel('title-input').type(title);
    cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
    cy.getBySel('body-input').type(`it is just updated body`);

    cy.getBySel('submit-button').click();

    cy.getBySel('profile-button').click();
    cy.url().should('include', '/profile');
    cy.getBySel('article-list')
      .children()
      .filter(`:contains(${title})`)
      .should('be.visible');
  });

  it('update article with duplicated title', () => {
    const title = 'duplicated title';
    cy.getBySel('title-input').type(title);
    cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
    cy.getBySel('body-input').type(`it is just updated body`);

    cy.getBySel('submit-button').click();

    cy.getBySel('error-messages').should('not.be.empty');
  });

  describe('when do not enter input', () => {
    it('without title input', () => {
      cy.getBySel('description-input').type(`Test Article ${Date.now()}`);
      cy.getBySel('body-input').type(`it is just updated body`);

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });

    it('without description input', () => {
      cy.getBySel('title-input').type(`Update Test Article ${Date.now()}`);
      cy.getBySel('body-input').type(`it it just body`);

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });

    it('without body input', () => {
      cy.getBySel('title-input').type(`Update Test Article ${Date.now()}`);
      cy.getBySel('description-input').type(`Test Article ${Date.now()}`);

      cy.getBySel('submit-button').click();

      cy.getBySel('error-messages').should('not.be.empty');
    });
  });
});

describe('try to access other user article', () => {
  beforeEach(() => {
    cy.ignoreNextRedirectError();
  });

  it('with login', () => {
    const email = Cypress.env('email');
    const password = Cypress.env('password');
    cy.login(email, password);
    cy.visit('/editor/testarticle');

    cy.url().should('not.include', '/editor');
  });

  it('without login', () => {
    cy.visit('/editor/testarticle');

    cy.url().should('not.include', '/editor');
  });
});
