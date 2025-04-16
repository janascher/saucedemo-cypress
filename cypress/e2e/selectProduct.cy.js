import 'cypress-xpath';

const massa = require('../fixtures/massa');

describe('Select Product', () => {

  beforeEach('Accessing the registration page', () => {
    cy.visit('/');
    // verificar se o título da página é SAuce Labs
    cy.title().should('eq', 'Swag Labs');
  });

  it('Select Sauce Labs Backpack', () => {
    // realizar o login
    cy.get('input[data-test="username"]').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('input[name="login-button"]').click();

    // carregar a página interna
    cy.get('span.title').should('have.text', 'Products');
    cy.get('img[alt="Sauce Labs Backpack"]').click();

    // carregar a página de item de inventário
    // apenas para demonstrar como fazer com Xpath Absoluto
    // verifica se no elemento via Xpath contém o texto Back to products
    cy.xpath('/html/body/div/div/div/div[1]/div[2]/div/button').should(
      'have.text',
      'Back to products'
    );
    // cy.get('#back-to-products').should('have.text', 'Back to products');
    cy.get('div.inventory_details_name.large_size').should('have.text', 'Sauce Labs Backpack');
    cy.get('div.inventory_details_price').should('have.text', '$29.99');
    cy.get('#add-to-cart').click();

    // verificar se no carrinho exibe o número 1
    cy.get('a.shopping_cart_link').should('have.text', '1').click();

    // carregar a página de carrinho
    cy.get('span.title').should('have.text', 'Your Cart');
    cy.get('div.inventory_item_name').should('have.text', 'Sauce Labs Backpack');
    cy.get('div.inventory_item_price').should('have.text', '$29.99');
    cy.get('div.cart_quantity').should('have.text', '1');
  });

  // ### Data Driven ###
  massa.array.forEach(({ username, productName, productPrice }) => {
    it(`Select ${productName} - User: ${username}`, () => {
      // realizar o login
      cy.get('input[data-test="username"]').type(username);
      cy.get('#password').type('secret_sauce');
      cy.get('input[name="login-button"]').click();

      // carregar a página interna
      cy.get('span.title').should('have.text', 'Products');
      cy.get(`img[alt="${productName}"]`).click();

      // carregar a página de item de inventário
      // apenas para demonstrar como fazer com Xpath Absoluto
      // verifica se no elemento via Xpath contém o texto Back to products
      cy.xpath('/html/body/div/div/div/div[1]/div[2]/div/button').should(
        'have.text',
        'Back to products'
      );
      // cy.get('#back-to-products').should('have.text', 'Back to products');
      cy.get('div.inventory_details_name.large_size').should('have.text', productName);
      cy.get('div.inventory_details_price').should('have.text', productPrice);
      cy.get('#add-to-cart').click();

      // verificar se no carrinho exibe o número 1
      cy.get('a.shopping_cart_link').should('have.text', '1').click();

      // carregar a página de carrinho
      cy.get('span.title').should('have.text', 'Your Cart');
      cy.get('div.inventory_item_name').should('have.text', productName);
      cy.get('div.inventory_item_price').should('have.text', productPrice);
      cy.get('div.cart_quantity').should('have.text', '1');
    });
  });
});
