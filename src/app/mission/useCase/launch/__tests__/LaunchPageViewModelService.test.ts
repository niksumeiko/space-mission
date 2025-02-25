import { describe, expect, it } from 'vitest';
import { createFakeRocket } from '../../../../domain/Rocket';
import { createLaunchPageModel } from '../LaunchPageViewModelService';

describe('Launch page view model', () => {
    it('returns the model with rocket manufacturing year', () => {
        const rocket = createFakeRocket({
            manufactured_date: new Date('2019-05-19').toISOString(),
        });

        const result = createLaunchPageModel({ rocket });

        expect(result.rocket.year).toBe(2019);
    });
});
