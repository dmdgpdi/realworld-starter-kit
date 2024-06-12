declare namespace Cypress {
  interface Chainable {
    getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    login(email: string, password: string): void;
  }
}
