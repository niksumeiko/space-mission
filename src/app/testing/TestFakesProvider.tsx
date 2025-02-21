'use client';

import { ReactNode } from 'react';
import { TestFakesContext, TestFakesContextType } from './TestFakesContext';

export function TestFakesProvider({
    fakes,
    children,
}: Required<TestFakesContextType> & {
    children: ReactNode;
}) {
    return <TestFakesContext.Provider value={{ fakes }}>{children}</TestFakesContext.Provider>;
}
