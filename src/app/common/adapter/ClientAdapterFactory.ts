'use client';

import { useTestFakes } from '../../testing/TestFakesContext';
import { settleFakeStub } from '../../testing/TestFakesAdapterService';
import { type AdapterFactoryOptions } from './AdapterFactoryService';

type Adapter<T, U = never> = {
    (): { getData(input?: U): Promise<T> };
    _name: string;
};

export function createClientAdapter<T, U = never>(options: AdapterFactoryOptions<T, U>) {
    const useClientAdapter: Adapter<T, U> = () => {
        const fakes = useTestFakes();

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

    useClientAdapter._name = options.name;

    return useClientAdapter;
}
