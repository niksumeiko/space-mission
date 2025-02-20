const fakes = new Map<string, Record<string, unknown> | undefined>();

export function getFakes(spec: string) {
  return fakes.get(spec);
}

export function setFakes(spec: string, changes: Record<string, unknown>) {
  const current = getFakes(spec);
  const updated = { ...current, ...changes };

  fakes.set(spec, updated);
}

export function resetFakes(spec: string) {
  fakes.set(spec, undefined);
}