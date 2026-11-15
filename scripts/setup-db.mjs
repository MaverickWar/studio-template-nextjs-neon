// Runs before every build: makes the database's tables match prisma/schema.prisma, so a new database
// (for example one Vercel's Neon integration just made) is ready with nothing to run by hand, and a new
// table or column in the schema appears on the next deploy. A change that would delete saved data
// (dropping a table or column, or a rename, which looks like one) stops the build instead of going
// ahead: make that change on purpose, as README.md explains. With no database connected yet it does
// nothing, and the app still builds.
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL && !process.env.DATABASE_URL_UNPOOLED) {
  console.log("No database connected yet (DATABASE_URL isn't set), so skipping table set-up.");
} else {
  try {
    execSync("npx prisma db push", { stdio: "inherit" });
  } catch {
    console.error("\nThe database wasn't changed, so nothing saved was lost. If the message above is about losing data, a table or column was removed or renamed in prisma/schema.prisma: see \"Changing the database\" in README.md.");
    process.exit(1);
  }
}
