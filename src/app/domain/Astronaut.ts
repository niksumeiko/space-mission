import { type Astronaut as NasaAstronaut } from 'nasa-client';

export type Astronaut = NasaAstronaut;

export function createFakeAstronauts(length: number): Astronaut[] {
    return Array.from({ length }, (_, i) => ({
        name: `Astronaut ${i}`,
        avatar: `avatar-${i}.jpg`,
    }));
}
