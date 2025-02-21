/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { setFakes } from './fakes';

type Adapter<T> = {
    (): T;
    _name: string;
};

type ExtractAdapterResponse<T> =
    T extends Promise<{ getData: (input?: any) => Promise<infer R> }>
        ? R
        : T extends { getData: (input?: any) => Promise<infer R> }
          ? R
          : never;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            injectFakeAdapter<T>(
                adapter: Adapter<T>,
                stub: { body: ExtractAdapterResponse<T>; statusCode?: number },
            ): void;
            getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
        }
    }
}

Cypress.Commands.add(
    'injectFakeAdapter',
    <T>(adapter: Adapter<T>, stub: { body: ExtractAdapterResponse<T>; statusCode?: number }) => {
        const current = Cypress.currentTest.titlePath.join(' > ');

        setFakes(current, {
            [adapter._name.toLowerCase()]: {
                statusCode: 200,
                ...stub,
            },
        });
    },
);

Cypress.Commands.add('getByTestId', (testId: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-test="${testId}"]`);
});
