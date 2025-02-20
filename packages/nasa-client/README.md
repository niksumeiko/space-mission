# Official NASA JavaScript SDK/Client

### Usage

#### Public interface
```ts
type Astronaut = {
  name: string;
  avatar: string;
};

function getAvailableAstronauts(max: string): Promise<Astronaut[]>;
```

#### Correct answer retrieval
```ts
import { getAvailableAstronauts } from 'nasa-client';

const astronauts: Astronaut[] = await getAvailableAstronauts(4);
```
