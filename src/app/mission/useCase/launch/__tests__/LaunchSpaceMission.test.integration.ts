import { useAvailableRocket } from '../../../../domain/RocketAdapter';
import { usePlanets } from '../../../../domain/PlanetsAdapter';
import { useAstronauts } from '../../../../domain/AstronautsAdapter';
import { launchMissionAdapter } from '../../../../domain/MissionLaunchAdapter';

describe('Launch a space mission', () => {
    it('see available rocket, select a planet, explore costs and launch the mission', () => {
        cy.injectFakeAdapter(useAvailableRocket, {
            body: {
                id: 'ROCKET_ID',
                model: 'Starship',
                capacity: 5,
                manufactured_date: '2025-02-26T16:00:00.000Z',
                state: 'AVAILABLE',
            },
        });
        cy.injectFakeAdapter(usePlanets, {
            body: [
                { id: 'MARS_ID', name: 'Mars', distance_au: 225 },
                { id: 'MOON_ID', name: 'Moon', distance_au: 1 },
            ],
        });
        cy.injectFakeAdapter(useAstronauts, {
            body: [
                { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=jonh' },
                { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=3jane' },
                { name: 'Elon Musk', avatar: 'https://i.pravatar.cc/150?img=elon' },
            ],
        });
        cy.injectFakeAdapter(launchMissionAdapter, {
            body: true,
        });

        cy.visit('/');

        cy.getByTestId('rocket-model').should('have.text', 'Starship');
        cy.getByTestId('planet-select').find('option:checked').should('have.text', 'Mars');
        cy.getByTestId('astronauts').should('have.length', '3');
        cy.getByTestId('mission-cost')
            .invoke('text')
            .then((cost) => {
                cy.getByTestId('planet-select').select('Moon');

                cy.getByTestId('mission-cost').should('not.equal', cost);

                cy.getByTestId('launch-control').click();

                cy.getByTestId('mission-success').should('be.visible');
            });
    });
});
