# Introduction

Automate the testing of various sections of Book listing website (https://books.toscrape.com).

# Steps

1. Visit the Homepage, check the Breadcrumb and page title and also test the pagination.
2. After that, First go to any list page.
3. Randomly pick one of the item.
4. Click on the the item.
5. This should go to details page.
6. Breadcrumbs check.
7. Breadcrumbs last portion should be same as the header.
8. Match Product details with product information: availability, price.


# Installation

To run this test project locally, follow these steps :

1. <b>First Step - </b> Clone the repository :
   
   ```bash
    git clone https://github.com/Aftahiislam007/BookListTesting.git
    ```

2. <b>Second Step - </b> Using `npm` to Instantly Initialize a Project 
 and it will create `package-lock.json` and `package.json` files :
    
    ```bash
    npm init -y
    ```

3. <b>Third Step - </b> Install Cypress via `npm` :
   
   ```bash
    cd Books
    ```

    ```bash
    npm install cypress --save-dev
    ```

4. <b>Fourth Step - </b> Adding npm Scripts in `package.json` file :
   
   ```js
    {
        "scripts": {
            "cy:open": "cypress open"
        }
    }
    ```

5. <b>Fifth Step - </b> Run the project :
   
   ```bash
    npm run cy:open
    ```