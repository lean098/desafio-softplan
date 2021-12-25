import 'cypress-wait-until';
import 'cypress-localstorage-commands';

Cypress.Commands.add('createUser', (user, saveUserId = true) => {
  Object.entries(user).map(([key, value]) => {
    if (key === 'role') {
      cy.get('[data-cy=role]').parent().click();
      return cy.get(`[data-cy=${value}]`).click();
    }
    return cy.get(`[data-cy=${key}]`).type(value);
  });

  cy.intercept('POST', '/users').as('createUser');

  cy.get('[data-cy=submit]')
    .should('be.visible')
    .and('be.enabled')
    .and('contain', 'Cadastrar')
    .click({ waitForAnimations: false, force: true });

  cy.wait('@createUser').then(({ response }) => {
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property('id');

    const { id: userId } = response.body;

    cy.setLocalStorage(saveUserId ? 'userId' : 'newUserId', `${userId}`);
  });
});

Cypress.Commands.add('login', (user) => {
  cy.visit('/');

  cy.get('[data-cy=email]').type(user.email);
  cy.get('[data-cy=password]').type(user.password);

  cy.get('[data-cy=submit]')
    .should('be.visible')
    .and('be.enabled')
    .contains('Entrar')
    .click();

  cy.waitUntil(() =>
    cy.document().then((doc) => doc.readyState === 'complete'),
  );
});

Cypress.Commands.add('removeUser', () => {
  cy.getLocalStorage('userId').then((userId) => {
    cy.request('DELETE', `http://localhost:3000/users/${userId}`)
      .as('remove created user')
      .then((response) => {
        expect(response.status).to.equal(200);
      });
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=open-menu]').click();
  cy.get('[data-cy=logout]')
    .should('be.visible')
    .and('contain', 'Sair')
    .click();
});
