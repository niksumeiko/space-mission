import { Planet } from '../../../domain/Planet';
import { Astronaut } from '../../../domain/Astronaut';

type Input = {
    destination?: Planet;
    astronauts: Astronaut[];
    date: Date;
};

type Model = {
    costs: number;
};

export function createMissionConfiguratorModel(input: Input): Model {
    if (!input.destination || input.astronauts.length === 0) {
        return { costs: 0 };
    }

    const base = input.destination.distance_au * 50000000 + input.astronauts.length * 5200000;
    const month = input.date.getMonth();

    if ([9, 10].includes(month)) {
        return { costs: Math.round(base * 1.15) };
    }

    if (month === 11) {
        return { costs: Math.round(base * 1.3) };
    }

    return {
        costs: Math.round(base),
    };
}
