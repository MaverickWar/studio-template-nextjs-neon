// The home page until it's built to its design. Building it means replacing this file.
import { ConnectDatabase } from "@/components/connect-database";
import { ComingNext } from "@/components/coming-next";
import { appShell, pageAt } from "@/lib/app-shell";
import { dbReady } from "@/lib/db";

export default function Home() {
  const home = pageAt("/");
  return (
    <div className="flex flex-col gap-10">
      <ComingNext name={home?.name && home.name !== "Home" ? home.name : appShell.name} purpose={appShell.tagline || home?.purpose} />
      {!dbReady && <ConnectDatabase />}
    </div>
  );
}
