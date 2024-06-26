declare namespace Cypress {
  interface Chainable {
    getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    login(email: string, password: string): Chainable<void>;
    checkCurrentPage(page: number): void;
    checkGlobalCategoryActive(activeColor: string): void;
    checkMyFeedCategoryActive(activeColor: string): void;
    checkTagCategoryActive(activeColor: string): void;
    ignoreNextRedirectError(): void;
  }
}
