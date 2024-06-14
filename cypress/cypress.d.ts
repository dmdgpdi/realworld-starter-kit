declare namespace Cypress {
  interface Chainable {
    getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    login(email: string, password: string): Chainable<void>;
    isCurrentPage(page: number): void;
    checkGlobalCategoryActive(activeColor: string): void;
  }
}
