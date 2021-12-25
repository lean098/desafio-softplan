/// <reference types="cypress" />

describe('Create new user', () => {
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

  it('Create new user when logged', () => {
    cy.get('[data-cy=add-user]').should('be.visible').and('be.enabled').click();

    cy.fixture('new-user.json').then((user) => {
      cy.createUser(user, false);
    });
  });

  it('Remove recent created user', () => {
    cy.getLocalStorage('newUserId').then((userId) => {
      cy.get(`[data-cy=user__${userId}]`).should('be.visible').click();
    });

    cy.get('[data-cy=remove]')
      .should('be.visible')
      .and('be.enabled')
      .and('contain', 'Deletar')
      .click();
  });

  it('Logout', () => {
    cy.logout();
  });

  it('Remove created user', () => {
    cy.removeUser();
  });
});
