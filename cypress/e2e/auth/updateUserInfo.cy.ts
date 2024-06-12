describe('update user info', () => {
  beforeEach(() => {
    cy.login('test3@gmail.com', '12345678');
    cy.getBySel('setting-button').click();
    cy.intercept({ url: '/settings', method: 'POST' }).as('setting');
    cy.intercept({ url: '**/user' }).as('getUser');
  });

  it('modify image username', () => {
    let previousUsername = '';
    const username1 = 'testIdForDev';
    const username2 = 'testIdForTest';
    cy.getBySel('profile-button').click();
    cy.getBySel('username')
      .invoke('text')
      .then(text => {
        previousUsername = text;
      });
    const newUsername = previousUsername == username1 ? username2 : username1;
    cy.getBySel('setting-button').click();
    cy.getBySel('username-input').type(newUsername);

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('profile-button').click();
    cy.getBySel('username')
      .invoke('text')
      .then(text => {
        expect(text).to.equal(newUsername);
      });
  });

  it('modify bio', () => {
    let previousBio = '';
    const bio1 = 'hi dev';
    const bio2 = 'hi test';
    let newBio = '';
    cy.getBySel('profile-button').click();
    cy.getBySel('user-bio')
      .invoke('text')
      .then(text => {
        previousBio = text;
        newBio = previousBio == bio1 ? bio2 : bio1;
        cy.getBySel('setting-button').click();
        cy.getBySel('bio-input').type(newBio);

        cy.getBySel('submit').click();

        cy.wait('@setting');
        cy.wait('@getUser');
        cy.getBySel('profile-button').click();
        cy.getBySel('user-bio')
          .invoke('text')
          .then(newText => {
            expect(newText).to.equal(newBio);
          });
      });
  });
});

describe('validate input', () => {
  beforeEach(() => {
    cy.login('test3@gmail.com', '12345678');
    cy.getBySel('setting-button').click();
    cy.intercept({ url: '/settings', method: 'POST' }).as('setting');
  });

  it('validate image url', () => {
    cy.getBySel('image-url-input').type('wrong string');

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('validate username', () => {
    cy.getBySel('username-input').type('a');

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('validate bio', () => {
    cy.getBySel('bio-input').type(' ');

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('validate email', () => {
    cy.getBySel('email-input').type('test3@dasdasadasd');

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('validate password', () => {
    cy.getBySel('password-input').type('11');

    cy.getBySel('submit').click();

    cy.wait('@setting');
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });
});

describe('unauthorized access', () => {
  it.only('access with no login', () => {
    cy.visit('/settings');
    cy.url().should('not.include', 'settings');
  });
});
