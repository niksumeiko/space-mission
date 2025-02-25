import { type Rocket } from '../../../domain/Rocket';

type Input = {
    rocket: Rocket;
};

type Model = {
    rocket: Rocket & {
        year: number;
    };
};

export function createLaunchPageModel({ rocket }: Input): Model {
    return {
        rocket: {
            ...rocket,
            year: new Date(rocket.manufactured_date).getFullYear(),
        },
    };
}
