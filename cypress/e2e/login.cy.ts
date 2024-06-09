describe('login', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/login');
    cy.intercept({ url: '/login', method: 'POST' }).as('login');
    cy.intercept({ url: '**/user', method: 'GET' }).as('getUserInfo');
  });

  it('correct login', () => {
    cy.getBySel('email-input').type('test3@gmail.com');
    cy.getBySel('password-input').type('12345678');
    cy.getBySel('submit').click();

    cy.wait('@login');
    //cy.wait('@getUserInfo');
    cy.visit('http://127.0.0.1:3000/');
    cy.getBySel('setting-button').should('be.visible');
  });

  it('wrong email login', () => {
    cy.getBySel('email-input').type('test3@gmail.comaaa');
    cy.getBySel('password-input').type('12345678');
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('not.be.empty');
  });

  it('wrong password login', () => {
    // 이메일 입력
    cy.getBySel('email-input').type('test3@gmail.com');
    // 비밀번호 입력
    cy.getBySel('password-input').type('1234567841241241');
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('not.be.empty');
  });

  it('wrong email format login', () => {
    // 이메일 입력
    cy.getBySel('email-input').type('test3gmail.comaaa');
    // 비밀번호 입력
    cy.getBySel('password-input').type('12345678');
    cy.getBySel('submit').click();
    cy.getBySel('error-messages').should('not.be.empty');
  });
});
