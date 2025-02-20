'use client';

import { TestFakesContext, TestFakesContextType } from './TestFakesContext';

export function TestFakesProvider({
  fakes,
  children,
}: Required<TestFakesContextType> & {
  children: React.ReactNode;
}) {
  return (
    <TestFakesContext.Provider value={{ fakes }}>
      {children}
    </TestFakesContext.Provider>
  );
}