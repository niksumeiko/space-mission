import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export type ThrowableAdapter<T> = {
    body: T;
    statusCode: number;
};

function getTestFake(adapterName: string, fakes: Map<string, unknown> | null) {
    const fake = fakes?.get(`test-fake-${adapterName}`) as string;

    if (!fake) {
        throw new Error(`Missing test fake for "${adapterName}"`);
    }

    return JSON.parse(fake);
}

export function settleFakeStub<T>(
    adapterName: string,
    fakes: Map<string, unknown> | null,
): Promise<T> {
    const fake = getTestFake(adapterName, fakes) as ThrowableAdapter<T>;

    if (`${fake.statusCode}`.startsWith('2')) {
        return Promise.resolve(fake.body);
    }

    return Promise.reject(fake.body);
}

export function getTestFakesFrom(headers: ReadonlyHeaders) {
    const map = new Map(headers.entries());
    const fakes = new Map<string, unknown>();

    for (const [key, value] of map.entries()) {
        if (key.startsWith('test-fake')) {
            fakes.set(key, value);
        }
    }

    return fakes;
}
