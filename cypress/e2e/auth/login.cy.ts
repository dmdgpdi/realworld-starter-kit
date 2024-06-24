describe('login', () => {
  const correctEmail = Cypress.env('email');
  const correctPassword = Cypress.env('password');
  const wrongEmail = 'worgemail@gmail.com';
  const wrongPassword = '11111111';
  const wrongFormatEmail = 'test3@gmailcom';
  const wrongFormatPassword = '12';

  beforeEach(() => {
    cy.visit('/login');
    cy.intercept({ url: '/login', method: 'POST' }).as('login');
    cy.intercept({ url: '**/user', method: 'GET' }).as('getUserInfo');
  });

  it('correct login', () => {
    cy.getBySel('email-input').type(correctEmail);
    cy.getBySel('password-input').type(correctPassword);
    cy.getBySel('submit').click();

    cy.wait('@login');
    cy.visit('/');
    cy.getBySel('setting-button').should('be.visible');
  });

  it('wrong email login', () => {
    cy.getBySel('email-input').type(wrongEmail);
    cy.getBySel('password-input').type(correctPassword);
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('not.be.empty');
  });

  it('wrong password login', () => {
    cy.getBySel('email-input').type(correctEmail);
    cy.getBySel('password-input').type(wrongPassword);
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('not.be.empty');
  });

  it('wrong email format login', () => {
    cy.getBySel('email-input').type(wrongFormatEmail);
    cy.getBySel('password-input').type(correctPassword);
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should(
      'have.text',
      'Please enter your email.',
    );
  });

  it('wrong password format login', () => {
    cy.getBySel('email-input').type(correctEmail);
    cy.getBySel('password-input').type(wrongFormatPassword);
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should(
      'have.text',
      'Please enter at least 4 digits of the password.',
    );
  });
});
