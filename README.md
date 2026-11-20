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

**CI → Staging → Approval → Production → Monitoring and rollback**

1. **CI** runs on pull requests into `main`, pushes to `main`, and manual release runs. Lint, Typecheck, Security Scan (`pnpm audit --audit-level high`), and Test (required source files and assets) run in parallel. Quality Gate requires all four jobs to pass before building `dist/` for `/mobile-app/` and writing its release manifest. Build artifacts are kept for 7 days on PRs and 30 days for enabled releases on `main`.
2. **Staging** deploys the candidate artifact to a Cloudflare Pages preview. It checks the release manifest, the homepage, the direct sign-in route, and static assets over HTTPS. The workflow summary links to the URL for that exact preview.
3. **Approval** uses required reviewers on the `github-pages` environment. The reviewer opens the verified staging link, then selects **Review deployments → github-pages → Approve and deploy** in the workflow run. A new release must still be the head of `main` when the production job starts.
4. **Production** publishes the same artifact to GitHub Pages. The production job refuses to publish if the reviewer rule is missing. Production runs are serialized and include verification of the deployed release against the staged manifest.
5. **Monitoring** verifies the live manifest, routes and assets hourly in **Monitor GitHub Pages**. A failed check fails the workflow run. An operator can then restore a verified artifact using the rollback procedure below.

Jobs using pnpm share `.github/actions/setup-project/action.yml` for Node.js, pnpm caching and frozen-lockfile installation. Actions are pinned to commit SHAs. PRs run CI only.

### Configure deployment

1. Keep **Settings → Pages → Build and deployment → Source** set to **GitHub Actions**. The production URL is `https://danghuudong.github.io/mobile-app/`.
2. In **Settings → Environments → github-pages**, add at least one **Required reviewer**, allow only `main` to deploy, and turn off protection-rule bypass for administrators. Enable **Prevent self-review** if another reviewer is available. [GitHub environment settings](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
3. In GitHub, create the `staging` environment and allow only `main` to deploy. Add `CLOUDFLARE_API_TOKEN` as an environment secret scoped to the Cloudflare account with **Cloudflare Pages: Edit**. Add `CLOUDFLARE_ACCOUNT_ID` and a dedicated project name in `CLOUDFLARE_PAGES_PROJECT` as repository Actions variables.
4. The first staging run creates the Cloudflare Pages **Direct Upload** project if it is missing. It uses `main` as the project's production branch and deploys previews to `staging`. The preview URLs need to be reachable by GitHub Actions and the reviewers. [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
5. Set the repository Actions variable `PAGES_ENABLED` to `true`. It enables releases and scheduled monitoring. To start the first release after merging the workflow, run **CI and GitHub Pages** on `main` with `rollback_run_id` blank. If a custom production URL is configured, set `PAGES_PRODUCTION_URL` to the full site base URL for scheduled checks.

### Roll back production

Open a successful production run in **Actions → CI and GitHub Pages** with an unexpired `verified-pages-*` artifact. Use the numeric run ID from its URL, run the same workflow on `main`, and enter that ID as `rollback_run_id`. The workflow stages the saved files, waits for approval, publishes them, and verifies production again. Verified production artifacts are retained for up to 90 days, subject to the repository retention limit.

For releases published before this workflow, or after the verified artifact expires, revert the change through a PR and release the resulting commit on `main`. A rollback restores the deployed files. Revert the source change on `main` if it should stay out of future releases.

Local verification follows repository instructions: run only `pnpm run lint` and `pnpm typecheck`. The application and production build are not run locally; the build runs in GitHub Actions.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — preview locally when needed
- `pnpm run lint` — lint and formatting checks
- `pnpm typecheck` — TypeScript checks

The development server and production build were not run during implementation. Only the dependencies needed for this static mockup are installed; no router, state management, backend, or shadcn initialization is needed.
