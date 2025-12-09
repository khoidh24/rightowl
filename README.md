# RightOwl Monorepo

This project is a monorepo built with [Turborepo](https://turbo.build/repo) and [Next.js](https://nextjs.org/).

## Project Structure

This monorepo handles multiple applications and shared packages:

```text
.
├── apps/
│   ├── apply-visa/          # Next.js app (Port 3001)
│   └── vietnam/             # Next.js app (Port 3000)
├── packages/
│   ├── env-config/          # Shared env loader utility
│   ├── eslint-config/       # Shared ESLint configurations
│   ├── tailwind-config/     # Shared Tailwind CSS configurations
│   ├── typescript-config/   # Shared typescript configurations
│   └── ui/                  # Shared React component library
├── .env.local               # Global environment variables
├── package.json
└── turbo.json
```

### Apps (`apps/`)

- **`vietnam`** (`apps/vietnam`): A Next.js application (Port 3000).
- **`apply-visa`** (`apps/apply-visa`): A Next.js application (Port 3001).

### Packages (`packages/`)

- **`@repo/ui`**: Shared React UI component library.
- **`@repo/env-config`**: Shared environment configuration utility (wraps `@next/env`).
- **`@repo/eslint-config`**: Shared ESLint configurations.
- **`@repo/typescript-config`**: Shared `tsconfig.json` configurations.
- **`@repo/tailwind-config`**: Shared Tailwind CSS configurations.

## Prerequisites

- OS: Windows (as per current environment) / macOS / Linux
- Runtime: [Bun](https://bun.sh/) (v1.2.22 or higher recommended)
- Node.js: >= 18

## Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd rightowl
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```

## Environment Variables

The project uses a centralized environment variable strategy.

1.  **Global Environment:**
    Create a `.env.local` file in the **root** directory of the monorepo. This file maintains shared environment variables used across applications.

    **File:** `./.env.local`

    ```env
    NEXT_PUBLIC_APPLY_VISA_DOMAIN="http://localhost:3000"
    NEXT_PUBLIC_VIETNAM_DOMAIN="http://localhost:3001"
    ```

    > **Note:** The `turbo.json` is configured with `globalDependencies: [".env.local"]` and `globalEnv` keys to ensure caching works correctly when these variables change.

2.  **Application Config:**
    Each app (`vietnam`, `apply-visa`) is configured to load this root `.env.local` file automatically using `@repo/env-config` in `next.config.js`.

## Development

To start the development server for all applications in parallel:

```bash
bun run dev
```

- **`apply-visa`** will be available at [http://localhost:3001](http://localhost:3001)
- **`vietnam`** will be available at [http://localhost:3000](http://localhost:3000)

### Feature: Proxy/Rewrites

The `vietnam` app is configured to proxy requests to `apply-visa`:

- `/apply-visa` -> `apply-visa` app root (`/`)
- `/apply-visa/*` -> `apply-visa` app paths (`/*`)

## Build

To build all apps and packages:

```bash
bun run build
```

Turborepo will cache the build artifacts. If you build again without changing anything, it will be instantaneous.

### Build Specific App

To build only one specific app (e.g., `vietnam`):

```bash
bun run build --filter=vietnam
```

## Linting & Type Checking

- **Lint all:** `bun run lint`
- **Type check:** `bun run check-types`

## Workflows

The project includes custom workflows defined in `.agent/workflows` (if applicable) for automation tasks.

## Troubleshooting

- **Environment Variables not loading:** Ensure you have created the `.env.local` file in the **root** directory.
- **Rewrite issues:** If redirections between apps aren't working, check the `NEXT_PUBLIC_APPLY_VISA_DOMAIN` variable in `.env.local`. It must contain the protocol (e.g., `http://localhost:3000`, not just `localhost:3000`).

## Key Implementations

- **Root Env Resolution**: Solved the challenge of importing/injecting root `.env.local` variables into apps (using `@repo/env-config`).
- **Unified Prettier**: Configured a shared Prettier setup for consistent code formatting.
- **Unified ESLint**: Implemented a shared ESLint configuration that includes `next-eslint` for Next.js best practices.
- **Shared Styles & VSCode**: Configured shared CSS/Tailwind styles while maintaining full VS Code extension support (IntelliSense/Linting) via `.vscode` settings.

## Deployment

### 1. Vercel (Recommended)

Turborepo is optimized for Vercel.

1.  **Connect Repository**: Connect your GitHub/GitLab repository to Vercel.
2.  **Create Projects**: You will need to create separate Vercel projects for each app (`vietnam`, `apply-visa`).
3.  **Configure Project**:
    - **Root Directory**: Set to `apps/vietnam` or `apps/apply-visa` respectively.
    - **Build Command**: Vercel will auto-detect `next build` or `turbo build`.
    - **Environment Variables**: Add the variables from `.env.local` to the Vercel Project Settings (Settings -> Environment Variables).
      - `NEXT_PUBLIC_APPLY_VISA_DOMAIN`: e.g., `https://apply-visa-production.vercel.app`
      - `NEXT_PUBLIC_VIETNAM_DOMAIN`: e.g., `https://vietnam-production.vercel.app`
4.  **Ignore Step**: To speed up builds, Vercel can skip building if the app didn't change.
    - Command: `npx turbo-ignore`

### 2. AWS EC2 with PM2

To deploy on a standard VPS/EC2 instance using PM2:

1.  **Clone & Install**:

    ```bash
    git clone <repo_url>
    cd rightowl
    bun install
    ```

2.  **Build**:

    ```bash
    bun run build
    ```

3.  **Start with PM2**:
    Create an `ecosystem.config.js` in the root:

    ```javascript
    module.exports = {
      apps: [
        {
          name: 'vietnam',
          script: 'bun',
          args: 'run start',
          cwd: './apps/vietnam',
          env: {
            PORT: 3000,
            NODE_ENV: 'production'
          }
        },
        {
          name: 'apply-visa',
          script: 'bun',
          args: 'run start',
          cwd: './apps/apply-visa',
          env: {
            PORT: 3001,
            NODE_ENV: 'production'
          }
        }
      ]
    }
    ```

4.  **Run**:
    ```bash
    pm2 start ecosystem.config.js
    pm2 save
    ```
