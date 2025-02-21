import { createContext, useContext } from 'react';

export type TestFakesContextType = {
    fakes: Map<string, unknown> | null;
};

export const TestFakesContext = createContext<TestFakesContextType | null>(null);

export function useTestFakes() {
    const context = useContext(TestFakesContext);

    return context?.fakes ?? new Map<string, unknown>();
}
