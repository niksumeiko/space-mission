# 🚀 &nbsp; Space mission kata

[![Nik Sumeiko](https://img.shields.io/badge/Nik_Sumeiko-0762C8?logo=LinkedIn)](https://www.linkedin.com/in/niksumeiko/) &nbsp; ![Awesome](https://awesome.re/badge.svg)

> A kata project to practice Test Driven Development with Nextjs.

&nbsp;
### Project description
The app enables to launch space missions by retrieving an available rocket, free astronauts, selecting a destination planet, explore estimated costs and launch the mission.

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

>⚠️ [Docker](https://www.docker.com/) is required to run tests. Make sure it's installed and running before executing the tests.

**Unit tests** (vitest) will execute files matching `__tests__/*.test.ts` pattern:

```shell
pnpm test:unit
```

**E2M tests** (cypress) will pick files matching `__tests__/*.e2m.ts` pattern:
```shell
pnpm test:e2m
```

>⚠️ For E2M tests, the app shall be compiled and running with the `NEXT_PUBLIC_PHASE=test` environmental variable.

&nbsp;
### Author / trainer
This project is maintained by [Nik Sumeiko](https://www.linkedin.com/in/niksumeiko/recent-activity/all/).

>#### Looking for React mentorship?
> Here's a link: https://www.withnik.com  
_(Let's check if you're eligible to join the program)_
