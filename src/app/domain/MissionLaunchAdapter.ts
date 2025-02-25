'use server';

import { createServerAdapter } from '../common/adapter/ServerAdapterFactory';
import { Astronaut } from './Astronaut';

type Input = {
    rocketId: string;
    planetId: string;
    astronauts: Astronaut[];
};

export const launchMissionAdapter = createServerAdapter({
    name: 'launchMissionAction',
    callback(input: Input) {
        // Do something with input
        console.log('Launching a mission', JSON.stringify(input));

        return Promise.resolve(true);
    },
});

export async function launch(input: Input) {
    const { getData: action } = await launchMissionAdapter();

    return action(input);
}
