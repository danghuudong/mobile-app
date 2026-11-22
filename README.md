# Lemoncare — hospital home screen

A presentation-only hospital app interface inspired by LemonCare. React, strict TypeScript, Vite, custom CSS, and Lucide icons. Responsive desktop and mobile layouts with static sample doctors, an upcoming visit, and a health summary.

Clinical content and dashboard controls are illustrative. No booking, search, messaging, account, or medical data integrations. Typography uses Google Fonts with local sans-serif fallbacks. Doctor photos are stored locally in `public/images` (Unsplash).

## Sign-in interface

- Open `/login`, or select **Sign in** in the overview header.
- Responsive email/password form with required-field and email validation, accessible field errors, keyboard focus indicators, password visibility toggle, and password-manager autocomplete.
- Submitting a valid form displays a preview notice. This is UI only: it does not make authentication requests, store credentials, create sessions, or protect the overview. No backend, registration, or password recovery is included.
- Labels follow the existing English interface. Shared branding lives in `src/shared/Brand.tsx`; the sign-in interface and styles live in `src/features/auth/`.
- The workflow creates `login/index.html` so `/login/` works on direct navigation and refresh. Links and public images respect Vite's `BASE_URL`. Navigation uses ordinary links.

## GitHub Actions CI/CD

**CI → Staging → Approval → Production → Monitoring and rollback**

1. **CI** runs on pull requests into `main`, pushes to `main`, and manual release runs. Lint, Typecheck, Security Scan (`pnpm audit --audit-level high`), and Test (required source files and assets) run in parallel. Quality Gate requires all four jobs to pass before building `dist/` for the site root and writing its release manifest. Build artifacts are kept for 7 days on PRs and 30 days for enabled releases on `main`.
2. **Staging** deploys the artifact to a preview on the `mobile-app-staging` Cloudflare Pages project. It verifies the release manifest, homepage, sign-in route, and static assets over HTTPS. Use the workflow summary to open that deployment's review URL.
3. **Approval** uses required reviewers on the GitHub `production` environment. Open the verified staging link, then select **Review deployments → production → Approve and deploy**. A new release must still be the head of `main` when the production job starts.
4. **Production** uploads the staged artifact to the `main` branch of the `mobile-app-production` Cloudflare Pages project and verifies the live release against the staged manifest. Production runs are serialized.
5. **Monitoring** checks the live manifest, routes, and assets hourly in **Monitor Cloudflare Pages**. A failed check fails the workflow run. An operator can restore a verified artifact using the rollback procedure below.

Jobs using pnpm share `.github/actions/setup-project/action.yml` for Node.js, pnpm caching and frozen-lockfile installation. Actions are pinned to commit SHAs. PRs run CI only.

### Configure deployment

1. Provision a Cloudflare Pages **Direct Upload** production project with `main` as its production branch. The staging workflow can provision its preview project on the first release. [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
2. In **Settings → Environments**, allow only `main` to deploy to `staging` and `production`. On `production`, configure at least one **Required reviewer** and turn off protection-rule bypass for administrators. Enable **Prevent self-review** if another reviewer is available. [GitHub environment settings](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
3. Add the `CLOUDFLARE_API_TOKEN` environment secret to both environments. Each credential needs **Cloudflare Pages: Edit** scoped to the Cloudflare account.
4. Set the repository Actions variables `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_PAGES_PROJECT` for staging, `CLOUDFLARE_PAGES_PRODUCTION_PROJECT` for production, and `CLOUDFLARE_PAGES_PRODUCTION_URL` to the production project's `pages.dev` URL. The production URL for Lemoncare is [mobile-app-production.pages.dev](https://mobile-app-production.pages.dev/).
5. Set `PAGES_ENABLED` to `true` to enable releases and scheduled monitoring. To start a manual release, run **CI and Cloudflare Pages** on `main` with `rollback_run_id` blank.

### Roll back production

Open a successful Cloudflare production run in **Actions → CI and Cloudflare Pages** with an unexpired `verified-cloudflare-pages-*` artifact. Use the numeric run ID from its URL, run the same workflow on `main`, and enter that ID as `rollback_run_id`. The workflow stages the saved files, waits for approval, publishes them, and verifies production again. Verified production artifacts are retained for up to 90 days, subject to the repository retention limit.

For releases that predate Cloudflare production or whose verified artifact has expired, revert the change through a PR and release the resulting commit on `main`. A rollback restores the deployed files. Revert the source change on `main` if it should stay out of future releases.

Local verification follows repository instructions: run only `pnpm run lint` and `pnpm typecheck`. The application and production build are not run locally; the build runs in GitHub Actions.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — preview locally when needed
- `pnpm run lint` — lint and formatting checks
- `pnpm typecheck` — TypeScript checks

The development server and production build were not run during implementation. Only the dependencies needed for this static mockup are installed; no router, state management, backend, or shadcn initialization is needed.
