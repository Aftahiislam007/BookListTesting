// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const PAGE_SIZE = 20;

Cypress.Commands.add("breadcrumbsTest", (numberOfLength = 2) => {
  cy.get(".breadcrumb").find("li").should("have.length", numberOfLength);
  cy.get(".breadcrumb").find("li:last-child.active").should("exist");
});

Cypress.Commands.add("headerTest", (text) => {
  cy.get(".page-header.action h1").should("have.text", text);
});

Cypress.Commands.add("paginationTest", () => {
  cy.get(".form-horizontal")
    .find("strong")
    .then((elements) => {
      const elementTags = Array.from(elements);
      const totalCount = elementTags[0];

      if (totalCount > PAGE_SIZE) {
        const secondLast = elementTags[1];
        const last = elementTags[2];
        const endingIndex = parseInt(last.textContent);
        const startingIndex = parseInt(secondLast.textContent);
        const pageSize = endingIndex - startingIndex + 1;
        return {
          pageSize,
          totalCount: parseInt(totalCount.textContent),
          startingIndex,
          endingIndex,
        };
      }

      return {
        pageSize: parseInt(totalCount).textContent,
        totalCount: parseInt(totalCount).textContent,
        startingIndex: null,
        endingIndex: null,
      };
    })
    .then(({ pageSize, totalCount, startingIndex, endingIndex }) => {
      if (totalCount > PAGE_SIZE) {
        cy.get(".product_pod").then((elements) => {
          /**
           * Number of items shown in header pagination
           * is same as the number of items in the page
           */
          const totalElements = Array.from(elements);
          expect(totalElements.length).to.equal(pageSize);
        });
        cy.get("ul.pager li.current").then((elements) => {
          const [element] = Array.from(elements);
          const textContent = element.textContent.trim();
          const totalPages = Math.ceil(totalCount / pageSize);
          const currentPage = Math.ceil(endingIndex / pageSize);
          expect(textContent).to.contain(totalPages);
          expect(textContent).to.contain(currentPage);

          /**
           * Next Button will show or not depending on the page
           */
          if (currentPage < totalPages) {
            cy.get(".next").should("exist");
            cy.get(".next a").realClick();
          }

          /**
           * Previous Button Logic
           */
          if (currentPage > 1) {
            cy.get(".previous").should("exist");
            cy.get(".previous a").realClick();
          }
        });
      }
    });
});

Cypress.Commands.add("listItemNumberTest", () => {
  cy.get(".product_pod").as("bookList");
  cy.get("@bookList").should("have.length", 20);
});

Cypress.Commands.add("randomItemSelectTest", () => {
  cy.get("@bookList").then(($books) => {
    const randomIndex = Math.floor(Math.random() * $books.length);
    cy.wrap($books[randomIndex])
      .find("h3 a")
      .as("randomBook")
      .invoke("text")
      .then((bookTitle) => {
        cy.wrap(bookTitle).as("selectedBookTitle");
      });
  });
});

Cypress.Commands.add("randomItemClickTest", () => {
  cy.get("@randomBook").click();
});

Cypress.Commands.add("goDetailPageTest", () => {
  cy.url().should("include", "catalogue");
});

Cypress.Commands.add("breadcrumbVisibilityCheckTest", () => {
  cy.get(".breadcrumb").should("be.visible");
});

Cypress.Commands.add("breadcrumbLastPortionCheckTest", () => {
  cy.get(".breadcrumb li.active")
    .invoke("text")
    .then((breadcrumbText) => {
      cy.get(".product_main h1").invoke("text").should("eq", breadcrumbText);
    });
});

Cypress.Commands.add("matchProductDetailsTest", () => {
  // cy.get('.availability').then(($availability) => {
  //   const availabilityText = $availability.text().trim();
  //   cy.get('.instock.availability').invoke('text').should('contain', availabilityText);
  // });

  // // Get price from the product detail page
  // cy.get('.price_color').then(($price) => {
  //   const priceText = $price.text().trim();
  //   cy.get('.price_color').invoke('text').should('eq', priceText);
  // });

  cy.get(".table.table-striped tr")
    .contains("Availability")
    .next()
    .invoke("text")
    .then((productInfoAvailability) => {
      cy.get(".instock.availability")
        .invoke("text")
        .then((mainSectionAvailability) => {
          const cleanProductInfoAvailability = productInfoAvailability.trim();
          const cleanMainSectionAvailability = mainSectionAvailability.trim();
          expect(cleanMainSectionAvailability).to.contain(
            cleanProductInfoAvailability
          );
        });
    });

  cy.get(".table.table-striped tr")
    .contains("Price (excl. tax)")
    .next()
    .invoke("text")
    .then((productInfoPrice) => {
      cy.get(".price_color")
        .invoke("text")
        .then((mainSectionPrice) => {
          const cleanProductInfoPrice = productInfoPrice.trim();
          const cleanMainSectionPrice = mainSectionPrice.trim();
          expect(cleanMainSectionPrice).to.contain(cleanProductInfoPrice);
        });
    });
});
