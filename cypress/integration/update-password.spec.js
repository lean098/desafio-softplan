/// <reference types="cypress" />

describe('Update password', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  const newPassword = '1246';

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

  it('Open Menu and naviagte to /user/profile', () => {
    cy.get('[data-cy=open-menu]').click();
    cy.get('[data-cy=profile]').should('be.visible').contains('Perfil').click();
  });

  it('write new password', () => {
    cy.get('[data-cy=new-password]').type(newPassword);
  });

  it('Update default user with new password', () => {
    const defaultUserPath = 'cypress/fixtures/user.json';
    cy.readFile(defaultUserPath).then((user) => {
      user.password = newPassword;
      cy.writeFile(defaultUserPath, JSON.stringify(user));
    });
  });

  it('submit form', () => {
    cy.get('[data-cy=submit]')
      .should('be.enabled')
      .and('be.visible')
      .and('contain', 'Atualizar')
      .click();
  });

  it('Login with new credentials', () => {
    cy.fixture('user.json').then(({ email }) => {
      cy.login({ email, password: newPassword });
    });
  });

  it('Logout', () => {
    cy.logout();
  });

  it('Remove created user', () => {
    cy.removeUser();
  });
});
