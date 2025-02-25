import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { type Planet } from '../Planet';
import { getPlanets } from '../PlanetsAdapter';

const API_URl = 'http://x.y/z';

const server = setupServer(
    http.get<never, never, { data: Planet[] }>(`${API_URl}/planets`, () => {
        return HttpResponse.json({
            data: [
                { id: 'x', name: 'Xx', distance_au: 1 },
                { id: 'y', name: 'Yy', distance_au: 2 },
            ],
        });
    }),
);

describe('Planets adapter', () => {
    beforeAll(() => {
        process.env.NEXT_PUBLIC_API_URL = API_URl;
        server.listen();
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('planets retrieval', () => {
        it('returns planets', async () => {
            const result = await getPlanets();

            expect(result).toEqual([
                { id: 'x', name: 'Xx', distance_au: 1 },
                { id: 'y', name: 'Yy', distance_au: 2 },
            ]);
        });
    });
});
