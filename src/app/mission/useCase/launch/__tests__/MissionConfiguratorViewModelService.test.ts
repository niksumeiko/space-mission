import { describe, expect, it } from 'vitest';
import { createMissionConfiguratorModel } from '../MissionConfiguratorViewModelService';
import { type Astronaut, createFakeAstronauts } from '../../../../domain/Astronaut';
import { createFakePlanet } from '../../../../domain/Planet';

describe('Mission configurator view model', () => {
    it('returns the model without mission costs when destination is unavailable', () => {
        const destination = undefined;
        const astronauts = createFakeAstronauts(2);
        const dateForBasePrice = new Date('2025-01-01');

        const result = createMissionConfiguratorModel({
            destination,
            astronauts,
            date: dateForBasePrice,
        });

        expect(result.costs).toBe(0);
    });

    it('returns the model without mission costs when astronauts are unavailable', () => {
        const destination = createFakePlanet({ distance_au: 2 });
        const astronauts: Astronaut[] = [];
        const dateForBasePrice = new Date('2025-01-01');

        const result = createMissionConfiguratorModel({
            destination,
            astronauts,
            date: dateForBasePrice,
        });

        expect(result.costs).toBe(0);
    });

    it('returns the model with mission costs', () => {
        const destination = createFakePlanet({ distance_au: 2 });
        const astronauts = createFakeAstronauts(2);
        const dateForBasePrice = new Date('2025-01-01');

        const result = createMissionConfiguratorModel({
            destination,
            astronauts,
            date: dateForBasePrice,
        });

        expect(result.costs).toBe(110400000);
    });

    it('returns model with increased mission costs', () => {
        const destination = createFakePlanet({ distance_au: 2 });
        const astronauts = createFakeAstronauts(2);
        const dateForBasePrice = new Date('2025-10-01');

        const result = createMissionConfiguratorModel({
            destination,
            astronauts,
            date: dateForBasePrice,
        });

        expect(result.costs).toBe(126960000);
    });

    it('returns model with premious mission costs', () => {
        const destination = createFakePlanet({ distance_au: 2 });
        const astronauts = createFakeAstronauts(2);
        const dateForBasePrice = new Date('2025-12-01');

        const result = createMissionConfiguratorModel({
            destination,
            astronauts,
            date: dateForBasePrice,
        });

        expect(result.costs).toBe(143520000);
    });
});
