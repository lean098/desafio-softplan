/// <reference types="cypress" />

describe('SignUp', () => {
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

  it('Remove created user', () => {
    cy.removeUser();
  });
});
