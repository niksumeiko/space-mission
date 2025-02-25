import postgres from 'postgres';
import { createServerAdapter } from '../common/adapter/ServerAdapterFactory';
import { Rocket } from './Rocket';

export const useAvailableRocket = createServerAdapter({
    name: 'useAvailableRocket',
    callback: getAvailableRocket,
});

export async function getAvailableRocket(): Promise<Rocket> {
    const sql = postgres(process.env.DATABASE_URL);
    const [rocket] = await sql<[Rocket]>`
      SELECT * FROM rockets
        WHERE state = 'AVAILABLE'
          LIMIT 1
  `;

    return rocket;
}
