export type Astronaut = {
  name: string;
  avatar: string;
};

export function getAvailableAstronauts(max: number): Promise<Astronaut[]>;
