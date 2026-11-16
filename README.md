# BusMo

BusMo (**Bus Mo**nitoring) is a bus tracker created for bus services Rizal. It helps commuters monitor a bus's capacity, GPS location, and ETA in realtime using an interactive map.

## Installation and usage

This has not been deployed. To test it out,
1. clone the repository
2. enter the project directory
3. run `npm install`
4. run `npm run dev`
5. open the given local dev server, usually [localhost:3000](http://localhost:3000)

## Stack and codebase

The project uses this tech stack:
- TypeScript
- Next.js + React 
- Tailwind for the CSS
- shadcn/ui for the UI components
- Leaflet + React Leaflet for the interactive map

## Contributing

- `main` is for the code deployed on the live site
- `dev` is the integration branch for review and testing

If you want to contribute, a basic git workflow is:

1. Create a **ticket branch** from `prod` and apply your changes.
2. **Open a PR** from your ticket branch to `dev`.
3. If approved, **merge PR** into `dev`.
4. Test changes on `dev`.
5. If tests pass, open PR from **original ticket branch** to `main`.

