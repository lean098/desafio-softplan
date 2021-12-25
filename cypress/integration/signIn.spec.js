/// <reference types="cypress" />

describe('SignIn', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Create user', () => {
    cy.visit('/');

    cy.get('[data-cy=register]')
      .should('be.visible')
      .and('contain', 'Fazer cadastro')
      .click();

    cy.fixture('user.json').then((user) => {
      cy.createUser(user);
    });
  });

  it('Login', () => {
    cy.fixture('user.json').then(({ email, password }) => {
      cy.login({ email, password });
    });
  });

  it('Logout', () => {
    cy.logout();
  });

  it('Remove created user', () => {
    cy.removeUser();
  });
});
