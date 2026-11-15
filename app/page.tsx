import { BusFront, MapPin, Route } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MapView from "@/components/map-view";

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

function MapSection() {
  return (
    <section
      aria-label="Route map"
      className="flex items-center justify-center relative isolate h-[clamp(280px,45svh,420px)] border-b bg-slate-100 md:h-auto md:border-b-0"
    >
      <MapView />
    </section>
  );
}

function InfoPanel() {
  return (
    <aside
      id="bus-route-info"
      aria-labelledby="route-heading"
      className="min-w-0 scroll-mt-4 space-y-4 p-4 wrap-anywhere md:col-start-1 md:row-start-1 md:border-r md:p-5"
    >
      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground">YOUR BUS ROUTE</p>
          <div className="mt-1 flex items-start gap-3">
            <Route aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 id="route-heading" className="text-lg font-semibold tracking-tight">
                Rizal Bus Route
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">6 stops • Map pins are dummy locations</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="text-sm leading-6 text-muted-foreground">
            <li>Imatong Court</li>
            <li>Savemore Market</li>
            <li>Petron Station</li>
            <li>Jollibee Baras</li>
            <li>Sagbat</li>
            <li>Tomas Claudio Colleges</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold tracking-tight">Stop &amp; Bus Details</h2>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed bg-background px-4 py-6 text-center">
            <MapPin aria-hidden="true" className="mx-auto mb-3 size-6 text-primary" />
            <p className="text-sm leading-6 text-muted-foreground">
              Select a stop or bus to view details.
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="grid flex-1 grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
        <MapSection />
        <InfoPanel />
      </main>
    </div>
  );
}
