import { headers } from 'next/headers';
import { getTestFakesFrom, settleFakeStub } from '../../testing/TestFakesAdapterService';
import { AdapterFactoryOptions } from './AdapterFactoryService';

type Adapter<T, U = never> = {
    (): Promise<{ getData(input?: U): Promise<T> }>;
    _name: string;
};

export function createServerAdapter<T, U = never>(options: AdapterFactoryOptions<T, U>) {
    const useServerAdapter: Adapter<T, U> = async () => {
        const headersList = await headers();
        const fakes = getTestFakesFrom(headersList);

        if (process.env.NEXT_PUBLIC_PHASE === 'test') {
            return {
                getData: () => {
                    return settleFakeStub<T>(options.name.toLowerCase(), fakes);
                },
            };
        }

        return {
            getData: options.callback,
        };
    };

    useServerAdapter._name = options.name;

    return useServerAdapter;
}
