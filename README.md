# 🚀 &nbsp; Space mission kata

[![Nik Sumeiko](https://img.shields.io/badge/Nik_Sumeiko-0762C8?logo=LinkedIn)](https://www.linkedin.com/in/niksumeiko/) &nbsp; ![Awesome](https://awesome.re/badge.svg)

> A kata project to practice Test Driven Development with Nextjs.

&nbsp;

### Project description

The app enables to launch space missions by retrieving an available rocket, free astronauts, selecting a destination planet, explore estimated costs and launch the mission.

# 🎯

The goal is to implement business requirements described under [#1 Launch a mission](https://github.com/niksumeiko/space-mission/issues/1) using Test Driven Development XP technique.

&nbsp;

### Getting started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

#### Create a [Neon](https://neon.tech) database

1. Sign up to https://neon.tech
2. Create a new project
3. Click the "Connect to your database"
4. Copy the connection string/url
5. Create the `.env` file in this repository:

```env
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require"
```

6. Add migration and seed the table with default row:

```sql
CREATE TABLE public.rockets (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    model text NOT NULL UNIQUE,
    capacity smallint NOT NULL,
    manufactured_date text NOT NULL,
    state text DEFAULT 'AVAILABLE' NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX state_index ON public.rockets (id, state);

INSERT INTO public.rockets (model, capacity, manufactured_date, state)
    VALUES ('Falcon 9', 7, '2025-02-26T16:00:00.000Z', 'AVAILABLE')
```

#### Unveil local API url

In the `.env` file, add the following line:

```env
API_URL="http://localhost:3000/api"
```

#### Start the app

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The auto-updates are enabled in favour to see made code changes as you edit files.

&nbsp;

### Testing

The project is configured for different types of tests.

> ⚠️ [Docker](https://www.docker.com/) is required to run tests. Make sure it's installed and running before executing the tests.

**Unit tests** (vitest) will execute files matching `__tests__/*.test.ts` pattern:

```shell
pnpm test:unit
```

**Integration tests** (cypress) will pick files matching `__tests__/*.test.integration.ts` pattern:

```shell
pnpm test:integration
```

> ⚠️ For Integration tests, the app is compiled and running with the `NEXT_PUBLIC_PHASE=test` environmental variable.

&nbsp;

### Author / trainer

This project is maintained by [Nik Sumeiko](https://www.linkedin.com/in/niksumeiko/recent-activity/all/).

[👨‍🏫 Author's intro](https://github.com/niksumeiko/space-mission/blob/main/about-nik-sumeiko.png)

> #### Looking for React mentorship?
>
> Here's a link: https://www.withnik.com  
> _(Let's check if you're eligible to join the program)_
