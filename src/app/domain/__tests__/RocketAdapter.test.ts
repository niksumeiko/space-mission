import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import postgres from 'postgres';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { getAvailableRocket } from '../RocketAdapter';

describe('Rocket adapter', () => {
    let container: StartedPostgreSqlContainer;
    let sql: ReturnType<typeof postgres>;

    beforeAll(async () => {
        container = await new PostgreSqlContainer().start();

        process.env.DATABASE_URL = container.getConnectionUri();
        sql = postgres(process.env.DATABASE_URL);

        await sql`
      CREATE TABLE rockets (
        id SERIAL PRIMARY KEY,
        model TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        manufactured_date TEXT NOT NULL,
        state TEXT CHECK(state IN ('ON A MISSION', 'AVAILABLE', 'RETIRED')) NOT NULL
      )
    `;
    }, 30000);

    afterEach(async () => {
        await sql`DELETE FROM rockets`;
    });

    afterAll(async () => {
        await container.stop();
    });

    describe('available rocket retrieval', () => {
        it('returns available rocket', async () => {
            await sql`
        INSERT INTO rockets (model, capacity, manufactured_date, state) 
          VALUES 
            ('X', 1, '2024-02-26T16:00:00.000Z', 'ON A MISSION'),
            ('Y', 2, '2025-02-26T16:00:00.000Z', 'AVAILABLE')
      `;

            const result = await getAvailableRocket();

            expect(result).toEqual({
                id: expect.any(Number),
                model: 'Y',
                capacity: 2,
                manufactured_date: '2025-02-26T16:00:00.000Z',
                state: 'AVAILABLE',
            });
        });
    });
});
