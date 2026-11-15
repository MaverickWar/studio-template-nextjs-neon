// Runs after the tables are set up (scripts/setup-db.mjs): makes the owner's own login, so the person
// who owns the app can sign in straight away. Studio puts OWNER_EMAIL and OWNER_PASSWORD on Vercel and
// shows them to the owner in Studio (Project settings › App setup). It only ever adds the account: if
// someone already has that email, nothing changes, so a password changed inside the app is kept.
// If the app has a "role" column on its user table, the owner's account gets the top role.
import { randomUUID } from "node:crypto";
import pg from "pg";
import { hashPassword } from "better-auth/crypto";

export async function makeOwner(env = process.env) {
  const email = (env.OWNER_EMAIL || "").trim().toLowerCase();
  const password = env.OWNER_PASSWORD || "";
  const url = env.DATABASE_URL_UNPOOLED || env.DATABASE_URL;
  if (!email || !password || !url) return "skipped";
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    const found = await client.query(`select id from "user" where lower(email) = $1`, [email]);
    let id = found.rows[0]?.id;
    if (!id) {
      id = randomUUID();
      const hash = await hashPassword(password);
      await client.query("begin");
      await client.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt") values ($1, 'Owner', $2, true, now(), now())`, [id, email]);
      await client.query(`insert into account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt") values ($1, $2, 'credential', $2, $3, now(), now())`, [randomUUID(), id, hash]);
      await client.query("commit");
    }
    // Apps that add roles: give the owner the top one. Not every app has this column, so a miss is fine.
    const role = await client.query(`select 1 from information_schema.columns where table_name = 'user' and column_name = 'role'`);
    if (role.rows.length) {
      for (const top of ["owner", "admin", "OWNER", "ADMIN"]) {
        try { await client.query(`update "user" set role = $1 where id = $2`, [top, id]); break; } catch { /* not one of this app's roles */ }
      }
    }
    return found.rows[0] ? "kept" : "made";
  } finally {
    await client.end().catch(() => {});
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  makeOwner().then((r) => {
    if (r === "made") console.log("Made the owner's login.");
    else if (r === "kept") console.log("The owner's login is already there.");
  }).catch((e) => {
    // A missing owner login shouldn't stop the app going live: the owner can still sign up.
    console.warn(`Couldn't make the owner's login (${e instanceof Error ? e.message : "unknown error"}). The app still builds.`);
  });
}
