# Lemoncare — hospital home screen

A presentation-only hospital app interface inspired by LemonCare. React, strict TypeScript, Vite, custom CSS, and Lucide icons. Responsive desktop and mobile layouts with static sample doctors, an upcoming visit, and a health summary.

Clinical content and dashboard controls are illustrative. No booking, search, messaging, account, or medical data integrations. Typography uses Google Fonts with local sans-serif fallbacks. Doctor photos are stored locally in `public/images` (Unsplash).

## Sign-in interface

- Open `/login`, or select **Sign in** in the overview header.
- Responsive email/password form with required-field and email validation, accessible field errors, keyboard focus indicators, password visibility toggle, and password-manager autocomplete.
- Submitting a valid form displays a preview notice. This is UI only: it does not make authentication requests, store credentials, create sessions, or protect the overview. No backend, registration, or password recovery is included.
- Labels follow the existing English interface. Shared branding lives in `src/shared/Brand.tsx`; the sign-in interface and styles live in `src/features/auth/`.
- On GitHub Pages the workflow creates `login/index.html` so `/mobile-app/login/` works on direct navigation and refresh. Links and public images respect Vite's `BASE_URL`. Other hosts should serve `index.html` for `/login` or create the same static route. Navigation uses ordinary links; no routing dependency is required.

## GitHub Actions CI/CD

The workflow is `.github/workflows/ci.yml`. It runs on pull requests into `main`, pushes to `main`, and manual runs from the Actions tab.

1. Set up Node.js 24 (from `.node-version`) and pnpm 12.10.1 (from `package.json`), with a dependency cache.
2. Run `pnpm install --frozen-lockfile`, `pnpm run lint`, and `pnpm typecheck`.
3. Build on the GitHub runner with a base path derived from the repository name (`/mobile-app/` for this repository), then create the static sign-in entry point.
4. On `main` only, upload and deploy that same artifact if the repository variable `PAGES_ENABLED` is `true`. Pull requests never deploy. A failed check prevents deployment.

Actions are pinned to commit SHAs. Dependabot checks for action updates monthly. Validation has read-only repository permissions; only the deployment job gets Pages and OIDC write permissions. No personal access token or deployment secret is needed. The `github-pages` environment records deployments; deploy jobs are serialized.

### Activate GitHub Pages

This repository uses public-repository GitHub Pages. Deployment is controlled by the repository variable `PAGES_ENABLED`; when it is absent or not `true`, CI still runs and deployment is skipped.

1. Use a public repository, or a GitHub plan that supports private-repository Pages. Pages availability depends on the repository's plan and visibility: [GitHub documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**. The published frontend will be accessible to website visitors; this UI preview does not provide access control.
3. Open **Settings → Secrets and variables → Actions → Variables** and create the repository variable `PAGES_ENABLED` with value `true`.
4. Merge the workflow into `main`. If it is already merged, select **Actions → CI and GitHub Pages → Run workflow → main**. Successful deployment publishes at `https://danghuudong.github.io/mobile-app/`, with sign-in at `/mobile-app/login/`.

For later releases, merge a passing PR into `main`; GitHub builds and deploys automatically. To redeploy an earlier version, revert the relevant change through a PR and merge it. Setting `PAGES_ENABLED` to `false` pauses future deployments; the already published website remains available.

Local verification follows repository instructions: run only `pnpm run lint` and `pnpm typecheck`. The application and production build are not run locally; the build runs in GitHub Actions.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — preview locally when needed
- `pnpm run lint` — lint and formatting checks
- `pnpm typecheck` — TypeScript checks

The development server and production build were not run during implementation. Only the dependencies needed for this static mockup are installed; no router, state management, backend, or shadcn initialization is needed.
