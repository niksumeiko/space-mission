import { createClientAdapter } from '../common/adapter/ClientAdapterFactory';
import { type Planet } from './Planet';

export const usePlanets = createClientAdapter({
    name: 'usePlanets',
    callback: getPlanets,
});

export async function getPlanets() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/planets`);
    const json: { data: Planet[] } = await response.json();

    return json.data;
}
