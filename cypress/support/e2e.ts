// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { getFakes, resetFakes } from './fakes';

beforeEach(() => {
  const current = Cypress.currentTest.titlePath.join(' > ');

  cy.intercept(new RegExp(`${Cypress.config('baseUrl')}/(?!_).*`), (req) => {
    const fakes = getFakes(current);

    for (const key in fakes) {
      req.headers[`test-fake-${key}`] = JSON.stringify(fakes[key]);
    }
  });
});

afterEach(() => {
  const current = Cypress.currentTest.titlePath.join(' > ');

  resetFakes(current);
});