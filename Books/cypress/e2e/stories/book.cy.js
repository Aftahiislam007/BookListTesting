describe("Testing Web To Scrape Website", () => {
    beforeEach(() => {
      cy.viewport(1024, 720);
    });
  
    context("Homepage", () => {
      it("Testing Page", () => {
        cy.visit("/");
        cy.breadcrumbsTest();
        cy.headerTest("All products");
        cy.paginationTest();
        // cy.paginationTest();
        // cy.paginationTest();
      });
    });
  
    context("Books Category: Mystery", () => {
      it("Testing Page", () => {
        cy.visit("/catalogue/category/books/mystery_3/");
        cy.breadcrumbsTest(3);
        cy.headerTest("Mystery");
        cy.paginationTest();
      });
    });
  
    context("Books Category: Travel", () => {
      it("Testing Page", () => {
        cy.visit("/catalogue/category/books/travel_2/");
        cy.breadcrumbsTest(3);
        cy.headerTest("Travel");
        cy.paginationTest();
      });
    });
  
    context("Books Category: Womens Fiction", () => {
      it("Testing Page", () => {
        cy.visit("/catalogue/category/books/womens-fiction_9/");
        cy.breadcrumbsTest(3);
        cy.headerTest("Womens Fiction");
        cy.paginationTest();
      });
    });
  
    context("Test the random book details page", () => {
      it("Should go to a random book detail page and validate its information", () => {
        cy.visit("/");
        cy.headerTest("All products");
        cy.listItemNumberTest();
        cy.randomItemSelectTest();
        cy.randomItemClickTest();
        cy.goDetailPageTest();
        cy.breadcrumbVisibilityCheckTest();
        cy.breadcrumbLastPortionCheckTest();
        cy.matchProductDetailsTest();
      });
    });
  });
  