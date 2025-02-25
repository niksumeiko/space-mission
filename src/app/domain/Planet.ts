export type Planet = {
    id: string;
    name: string;
    distance_au: number;
};

export function createFakePlanet(changes?: Partial<Planet>): Planet {
    return {
        id: '1',
        name: 'Pandora',
        distance_au: 2,
        ...changes,
    };
}
