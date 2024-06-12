describe('register', () => {
  const username = 'testUsernameForDev';
  const email = 'test3@gmail.com';
  const password = '12345678';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('correct register', () => {
    cy.intercept({ url: '**/users' }).as('register');
    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.wait('@register');

    cy.url().should('include', 'login');
  });

  it('duplicate register', () => {
    cy.intercept(
      { url: '**/users' },
      {
        statusCode: 422,
        body: {
          errors: {
            email: ['is duplicated.'],
          },
        },
      },
    ).as('register');
    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.wait('@register').then(res => {
      console.log(res.response);
      console.log(res.response.headers);
    });

    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('correct register with server error', () => {
    cy.intercept(
      { url: '**/users' },
      {
        statusCode: 500,
      },
    ).as('register');
    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.wait('@register');

    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });
});

describe('wrong format register', () => {
  const username = 'testUsernameForDev';
  const email = 'test3@gmail.com';
  const password = '12345678';

  const wrongFormatUsername = 't';
  const wrongFormatEmail = 'test3gmail.com';
  const wrongFormatPassword = '12';

  beforeEach(() => {
    cy.visit('/register');
    cy.intercept({ url: '**/users' }).as('register');
  });

  it('wrong format username register', () => {
    cy.getBySel('username-input').type(wrongFormatUsername);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('wrong format email register', () => {
    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(wrongFormatEmail);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });

  it('wrong format password register', () => {
    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(wrongFormatPassword);

    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });
});

describe('register with network error', () => {
  const username = 'testUsernameForDev';
  const email = 'test3@gmail.com';
  const password = '12345678';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('correct register', () => {
    cy.intercept(
      { url: '**/users' },
      {
        forceNetworkError: true,
      },
    ).as('register');

    cy.getBySel('username-input').type(username);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit').click();
    cy.wait('@register');

    cy.getBySel('error-messages').should('be.visible').and('not.be.empty');
  });
});
