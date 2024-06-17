const activeColor = 'rgb(92, 184, 92)';
const email = 'test3@gmail.com';
const password = '12345678';

describe('read global article list', () => {
  it('normal access', () => {
    cy.visit('/');

    cy.getBySel('article-list').should('be.visible');
    cy.checkGlobalCategoryActive(activeColor);
  });

  it('click article category', () => {
    cy.visit('/eos/1');

    cy.getBySel('global-feed-nav').click();

    cy.getBySel('article-list').should('be.visible');
    cy.checkGlobalCategoryActive(activeColor);
  });

  describe('access an abnormal address', () => {
    it('visit /-1', () => {
      cy.visit('/-1');

      cy.checkCurrentPage(1);
      cy.checkGlobalCategoryActive(activeColor);
    });

    it('visit /string', () => {
      const weirdString = '/somethingstring';

      cy.visit(weirdString);

      cy.checkCurrentPage(1);
      cy.checkGlobalCategoryActive(activeColor);
    });

    it('visit huge number', () => {
      const hugeNumber = 99999999999;
      cy.visit(`/${hugeNumber}`);

      cy.on('uncaught:exception', err => {
        if (err.message.includes('NEXT_REDIRECT')) {
          // NEXT_REDIRECT가 동작하는지 확인
          expect(err.message.includes('NEXT_REDIRECT')).equal(true);
          return false;
        }

        return true;
      });
      cy.url().should('not.include', `${hugeNumber}`);
      cy.checkCurrentPage(1);
      cy.checkGlobalCategoryActive(activeColor);
    });
  });

  describe('change pagination', () => {
    it('move next page', () => {
      cy.visit('/');

      cy.getBySel('next-page').children().click();

      cy.url().should('include', '/2');
      cy.checkGlobalCategoryActive(activeColor);
      cy.checkCurrentPage(2);
    });

    it('move previous page', () => {
      cy.visit('/');
      cy.getBySel('previous-page').should('not.exist');
      cy.getBySel('next-page').children().click();

      cy.getBySel('previous-page').should('exist').children().click();

      cy.url().should('include', '/1');
      cy.checkGlobalCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });
  });
});

describe('read feed article list', () => {
  describe('address access', () => {
    it('url access with login', () => {
      cy.login(email, password);
      cy.visit('/feed');

      cy.getBySel('article-list').should('be.visible');
      cy.checkMyFeedCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });

    it('url access without login', () => {
      cy.ignoreNextRedirectError();
      cy.visit('/feed');

      cy.url().should('include', '/login');
    });
  });

  it('click feed category', () => {
    cy.login(email, password);

    cy.getBySel('my-feed-nav').click();

    cy.getBySel('article-list').should('be.visible');
    cy.checkMyFeedCategoryActive(activeColor);
    cy.checkCurrentPage(1);
  });

  describe('access an abnormal address', () => {
    beforeEach(() => {
      cy.login(email, password);
    });

    it('visit /feed/-1', () => {
      cy.visit('/feed/-1');

      cy.checkMyFeedCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });

    it('visit /feed/string', () => {
      const weirdString = 'somethingstring';

      cy.visit(`/feed/${weirdString}`);

      cy.checkCurrentPage(1);
      cy.checkMyFeedCategoryActive(activeColor);
    });

    it('visit huge number', () => {
      const hugeNumber = 99999999999;
      cy.ignoreNextRedirectError();

      cy.visit(`/feed/${hugeNumber}`);

      cy.url().should('not.include', `${hugeNumber}`);
      cy.checkMyFeedCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });
  });

  describe('change pagination', () => {
    beforeEach(() => {
      cy.login(email, password);
    });

    it('move next page', () => {
      cy.visit('/feed');

      cy.getBySel('next-page').children().click();

      cy.url().should('include', 'feed/2');
      cy.checkMyFeedCategoryActive(activeColor);
      cy.checkCurrentPage(2);
    });

    it('move previous page', () => {
      cy.visit('/feed');
      cy.getBySel('previous-page').should('not.exist');
      cy.getBySel('next-page').children().click();

      cy.getBySel('previous-page').should('exist').children().click();

      cy.url().should('include', 'feed/1');
      cy.checkMyFeedCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });
  });
});

describe('read tag article list', () => {
  it('click sidebar tag', () => {
    cy.visit('/');

    cy.getBySel('tag-link-testTag').click();

    cy.getBySel('article-list').should('be.visible');
    cy.checkTagCategoryActive(activeColor);
  });

  describe('address access', () => {
    it('access normal address', () => {
      cy.visit('/testTag/1');

      cy.getBySel('article-list').should('be.visible');
      cy.checkTagCategoryActive(activeColor);
    });

    describe('access an abnormal address', () => {
      it('missing pageNumber', () => {
        cy.visit('/testTag');

        // ! not TagCategoryActive
        cy.checkGlobalCategoryActive(activeColor);
      });

      it('not exist tag', () => {
        cy.visit('/not-exist-tag');

        cy.checkGlobalCategoryActive(activeColor);
      });

      it('visit /testTag/-1', () => {
        cy.visit('/testTag/-1');

        cy.checkTagCategoryActive(activeColor);
        cy.checkCurrentPage(1);
      });

      it('visit /testTag/string', () => {
        const weirdString = 'somethingstring';
        cy.ignoreNextRedirectError();

        cy.visit(`/testTag/${weirdString}`);

        cy.checkTagCategoryActive(activeColor);
        cy.checkCurrentPage(1);
      });

      it('visit huge number', () => {
        const hugeNumber = 99999999999;
        cy.ignoreNextRedirectError();

        cy.visit(`/testTag/${hugeNumber}`);

        cy.url().should('not.include', `${hugeNumber}`);
        cy.checkGlobalCategoryActive(activeColor);
        cy.checkCurrentPage(1);
      });
    });
  });

  describe('change pagination', () => {
    it('move next page', () => {
      cy.visit('/testTag/1');
      cy.getBySel('next-page').children().click();

      cy.url().should('include', '/testTag/2');
      cy.checkTagCategoryActive(activeColor);
      cy.checkCurrentPage(2);
    });

    it('move previous page', () => {
      cy.visit('/testTag/1');
      cy.getBySel('previous-page').should('not.exist');
      cy.getBySel('next-page').children().click();

      cy.getBySel('previous-page').should('exist').children().click();

      cy.url().should('include', '/testTag/1');
      cy.checkTagCategoryActive(activeColor);
      cy.checkCurrentPage(1);
    });
  });
});
