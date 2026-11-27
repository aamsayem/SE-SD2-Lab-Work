# SE & SD Lab Practice
Name: Abdullah Al Mahmud Sayem  
ID: C241175  
Section: 6AM | Dept. of CSE, IIUC

Full-stack practice workspace organized into `FrontEnd/vite-project/` (React, Tailwind, Router, Hooks, Fetch/Axios) and `Backend/` (Express, PostgreSQL, Drizzle ORM, CRUD, joins/aggregates, JWT auth).

## Local setup

The backend uses PostgreSQL through `pg` and Drizzle ORM; a Supabase project provides the hosted PostgreSQL database. The Supabase JavaScript client is not used by this backend.

1. In Supabase, create/open a project and copy its PostgreSQL connection URI from **Project Settings → Database → Connect**. Keep the database password private.
2. In PowerShell, from the workspace root, create the local environment file:

   ```powershell
   Copy-Item Backend\.env.example Backend\.env
   ```

3. Edit `Backend\.env`: replace `DATABASE_URL` with the Supabase URI and set `JWT_SECRET` to a private random value. For example, generate one with:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. For a new, empty Supabase database, push the Drizzle schema:

   ```powershell
   Set-Location Backend
   npm run db:push
   ```

   Review any proposed schema changes before confirming, especially if the database already contains data.
5. In that same terminal, start the backend:

   ```powershell
   npm run dev
   ```

   It listens at `http://localhost:3000` after it connects to PostgreSQL. Open that URL to check the API.
6. Start the frontend in a second terminal:

   ```powershell
   Set-Location FrontEnd\vite-project
   npm run dev
   ```

   Open the local URL printed by Vite. Use the navbar to switch between all React practice pages; the **Students API** page (`/students`) connects directly to the local backend (`http://localhost:3000/api/students`).

`Backend/.env` is ignored by Git. Never commit or share the Supabase connection URI or JWT secret. Without a Supabase URI and database password in the local `.env`, the backend cannot connect or start.