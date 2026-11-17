# Lemoncare — hospital home screen

A presentation-only hospital app interface inspired by LemonCare. React, strict TypeScript, Vite, custom CSS, and Lucide icons. Responsive desktop and mobile layouts with static sample doctors, an upcoming visit, and a health summary.

Clinical content and dashboard controls are illustrative. No booking, search, messaging, account, or medical data integrations. Typography uses Google Fonts with local sans-serif fallbacks. Doctor photos are stored locally in `public/images` (Unsplash).

## Sign-in interface

- Open `/login`, or select **Sign in** in the overview header.
- Responsive email/password form with required-field and email validation, accessible field errors, keyboard focus indicators, password visibility toggle, and password-manager autocomplete.
- Submitting a valid form displays a preview notice. This is UI only: it does not make authentication requests, store credentials, create sessions, or protect the overview. No backend, registration, or password recovery is included.
- Labels follow the existing English interface. Shared branding lives in `src/shared/Brand.tsx`; the sign-in interface and styles live in `src/features/auth/`.
- Configure the production host to serve `index.html` for `/login` so direct links and refreshes work. Navigation uses ordinary links; no routing dependency is required.

## Commands

- `pnpm install` — install dependencies
- `pnpm run dev` — preview locally when needed
- `pnpm run lint` — lint and formatting checks
- `pnpm typecheck` — TypeScript checks

The development server and production build were not run during implementation. Only the dependencies needed for this static mockup are installed; no router, state management, backend, or shadcn initialization is needed.
