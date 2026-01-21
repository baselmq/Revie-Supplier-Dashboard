# Revie Supplier Dashboard

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Biome** - Linting and formatting
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the web application.

## Git Hooks and Formatting

- Format and lint fix: `pnpm run check`

## Project Structure

```
revie-supplier-dashboard/
├── apps/
│   ├── web/         # Frontend application (Next.js)
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run dev:web`: Start only the web application
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run check`: Run Biome formatting and linting

## Architectural Decisions & Trade-offs

### 1. Framework & Routing

- Next.js App Router with public and protected routes for a clear auth flow.

### 2. State & Forms

- React Hook Form with Zod for shared, typed form validation.
- Local storage to keep a mock login state between page reloads.

### 3. UI/UX

- shadcn/ui and TailwindCSS for consistent components and styling.
