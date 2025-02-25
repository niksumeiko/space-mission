import { getAvailableAstronauts } from 'nasa-client';
import { createClientAdapter } from '../common/adapter/ClientAdapterFactory';
import { type Astronaut } from './Astronaut';

type Input = number;

export const useAstronauts = createClientAdapter<Astronaut[], Input>({
    name: 'useAstronauts',
    callback: getAvailableAstronauts,
});
