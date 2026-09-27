# NestJS Practice

This repository contains small projects and exercises created while learning
[NestJS](https://nestjs.com/).

Each top-level folder is intended to be a separate practice project. More
folders will be added as new NestJS concepts are explored.

## Projects

| Folder | Purpose |
| --- | --- |
| `nest-intro/` | Introductory NestJS exercises (coming soon) |

## Working with a project

Open the folder for the exercise you want to run, install its dependencies, and
use the scripts defined in that project's `package.json`:

```bash
cd nest-intro
npm install
npm run start:dev
```

Commands may differ between projects, so check the local `package.json` and
README when they are available.

## Repository conventions

- Keep each practice project in its own top-level folder.
- Keep dependencies and scripts local to the project that uses them.
- Commit lockfiles so installations remain reproducible.
- Do not commit generated output, dependencies, logs, or local environment
  files; the root `.gitignore` applies to all project folders.
- Add an `.env.example` whenever a project requires environment variables.

## Requirements

- A current Node.js LTS release
- npm (or the package manager specified by an individual project)

