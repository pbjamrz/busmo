import { BusFront } from "lucide-react";

import InfoExplorer from "@/components/info-explorer";

function Header() {
  return (
    <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <BusFront aria-hidden="true" className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">BusMo</h1>
          <p className="text-xs text-muted-foreground">Bus Monitoring App</p>
        </div>
      </div>
    </header>
  );
}


export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <InfoExplorer />
    </div>
  );
}
