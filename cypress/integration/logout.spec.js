/// <reference types="cypress" />

describe('Logout', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Create user', () => {
    cy.visit('/register');

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
