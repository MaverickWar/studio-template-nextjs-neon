# Studio template: Next.js + Neon + Prisma

The starter Universal App Studio copies when someone picks **Next.js + Neon** while setting up a new project. It's Studio's default for websites and web apps.

- **Next.js** for the pages, with shadcn/ui components.
- **Neon** for the database: free Postgres that Vercel connects in a couple of clicks. Neon's free plan allows up to 100 projects, so every app can have its own.
- **Prisma** to read and save data (`lib/db.ts`, tables in `prisma/schema.prisma`).
- **Better Auth** for sign-in with email and password, with accounts kept in the app's own database (`lib/auth.ts`). Pages: `/sign-in`, `/sign-up` and `/account` (signed-in only).

**The look comes from `design/tokens.json`.** Studio replaces it with the project's own design straight after copying this template. `lib/design-tokens.ts` turns the tokens into the CSS variables the components use and loads the two fonts. Change the look by editing `design/tokens.json`, never by hard-coding colours.

**The menu, header and footer come from `design/app-shell.json`.** Studio writes it from the project's app map: the app's name, every page (name, web address, whether it's in the menu, what it's for), menu position (`top` or `side`), the footer line, and whether people sign in (`signIn`).

- `components/app-shell.tsx` and `components/nav-links.tsx` are the frame every page sits in, with a phone menu and the sign-in button.
- A page in `app-shell.json` that hasn't been built yet still opens, showing "Coming next" (`app/[page]/page.tsx`). Building it means adding `app/<page>/page.tsx`, which takes over.
- Add, rename or reorder pages in `design/app-shell.json`, not in the components.

## Connecting the database (once, on Vercel)

1. Open the project on Vercel and go to **Storage**.
2. Choose **Neon**, create a database on the free plan, and connect it to this project. Vercel adds `DATABASE_URL` for you.
3. Redeploy. The build sets up the tables (`scripts/setup-db.mjs`), so there's nothing to run by hand.

**The owner's login.** When `OWNER_EMAIL` and `OWNER_PASSWORD` are set (Studio sets both and shows them in Project settings › App setup), the build also makes that account if it isn't there yet (`scripts/owner.mjs`), so the owner can sign in straight away. It never changes an account that already exists.

Until a database is connected the app still builds and runs; the home page shows these steps and the sign-in button stays hidden.

Optional settings: `BETTER_AUTH_SECRET` (signs sign-in cookies; without it a key made from the private database address is used) and `BETTER_AUTH_URL` (your own domain, if the app has one; Vercel's addresses already work). See `.env.example`.

## Changing the database

Tables live in `prisma/schema.prisma`. Every build makes the database match that file, so:

- **Adding** a table or a column: add it to the schema. It appears on the next deploy. A new column on a table that already has rows needs a default (`@default(...)`) or `?` (optional).
- **Removing or renaming** a table or column would delete saved data, so the build stops instead and nothing is changed. Do it in two steps: add the new one and copy the data across, deploy, then remove the old one and run `npx prisma db push --accept-data-loss` once against the database on purpose.
- Read and save data from server code with `import { db } from "@/lib/db"`, for example `await db.note.findMany()`.
- Who's signed in: `import { currentSession } from "@/lib/session"` in a server component or action. `app/account/page.tsx` shows how to keep a page signed-in only.

## Running it on a computer

```
npm install
cp .env.example .env.local   # then paste your Neon connection string as DATABASE_URL
npm run dev
```

Open http://localhost:3000. Without `DATABASE_URL` it runs too, just without sign-in.

## Checks

```
npm run lint
npm run build
```
