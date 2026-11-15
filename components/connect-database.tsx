// Shown until a database is connected: how to add one (free) on Vercel.
export function ConnectDatabase() {
  return (
    <section className="rounded-lg border bg-card p-6 max-w-2xl flex flex-col gap-3">
      <h2 className="font-display text-xl font-bold">Connect a database</h2>
      <p className="text-muted-foreground">Sign-in and saved data need a database. Neon&apos;s free plan is enough to start.</p>
      <ol className="list-decimal pl-5 flex flex-col gap-1.5">
        <li>Open this project on Vercel and go to <b>Storage</b>.</li>
        <li>Choose <b>Neon</b> (Serverless Postgres), create it on the free plan and connect it to this project.</li>
        <li>Redeploy. The tables are set up for you during the build.</li>
      </ol>
    </section>
  );
}
