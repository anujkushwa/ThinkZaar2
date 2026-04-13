## ThinkZaar setup (Windows)

### 1) Requirements
- Node.js 20+ recommended
- A Clerk application (for auth)
- A cloud Postgres database (Neon/Supabase/etc)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables
- Copy `.env.example` to `.env`
- Fill in:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `DATABASE_URL`

### 4) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5) Notes
- This project uses a custom dev server (`server.js`) to enable Socket.IO.
- Turbopack is disabled by default in `server.js` for Windows/OneDrive reliability.
- Initialize your database by running `sql/001_init.sql` in your cloud Postgres SQL editor.

