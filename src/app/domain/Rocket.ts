export type Rocket = {
    id: string;
    model: string;
    capacity: number;
    manufactured_date: string;
    state: 'ON A MISSION' | 'AVAILABLE' | 'RETIRED';
};

export function createFakeRocket(options?: Partial<Rocket>): Rocket {
    return {
        id: '1',
        model: 'Falcon 9',
        capacity: 22800,
        manufactured_date: '2010-06-04',
        state: 'ON A MISSION',
        ...options,
    };
}
