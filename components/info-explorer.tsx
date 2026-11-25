/* "use client";
import { useState } from "react";
import { MapPin, Route } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import MapView from "@/components/map-view";
import { stops } from "@/lib/stop-data";

type MapSectionProps = {
  selectedStopId: string | null;
  onSelectStop: (stopId: string) => void;
};

function MapSection({ selectedStopId, onSelectStop }: MapSectionProps) {
  return (
    <section
      aria-label="Route map"
      className="flex items-center justify-center relative isolate h-[clamp(280px,45svh,420px)] border-b bg-slate-100 md:col-start-2 md:row-start-1 md:h-auto md:min-h-105 md:border-b-0"
    >
      <MapView selectedStopId={selectedStopId} onSelectStop={onSelectStop}/>
    </section>
  );
}

type InfoPanelProps = {
    selectedStopId: string | null;
    onSelectStop: (stopId: string) => void;
};

function InfoPanel({ selectedStopId, onSelectStop }: InfoPanelProps) {
  const selectedStop = stops.find((stop) => stop.id === selectedStopId);

  return (
    <aside
      id="bus-route-info"
      aria-labelledby="route-heading"
      className="scroll-mt-4 space-y-4 p-4 wrap-anywhere md:col-start-1 md:row-start-1 md:border-r md:p-5"
    >
      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground">BUS AND STOP INFO</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            {selectedStop ? selectedStop.name : ""}
          </h2>
        </CardHeader>
        <CardContent>
          <p role="status" className="sr-only">
            {selectedStop ? `Selected stop: ${selectedStop.name}` : ""}
          </p>
          {selectedStop ? (
            <div className="p-1">
              <p className="text-sm leading-6 text-muted-foreground">
                {selectedStop.description}
              </p>
            </div>
          ) : (
          <div className="rounded-lg border border-dashed bg-background px-4 py-6 text-center">
            <MapPin aria-hidden="true" className="mx-auto mb-3 size-6 text-primary" />
            <p className="text-sm leading-6 text-muted-foreground">
              Select a stop or bus to view details.
            </p>
          </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground">YOUR BUS ROUTE</p>
          <div className="mt-1 flex items-start gap-3">
            <Route aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 id="route-heading" className="text-lg font-semibold tracking-tight">
                Rizal Bus Route
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">6 stops • Click to learn more</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ol aria-label="Route stops" className="space-y-2">
            {stops.map((stop, index) =>
              <li key={stop.id}>
                <Button
                  aria-pressed={selectedStopId === stop.id}
                  variant={selectedStopId === stop.id ? "default" : "outline"}
                  onClick={() => onSelectStop(stop.id)}
                  className="h-auto min-h-11 w-full justify-start text-left whitespace-normal"
                >
                  {index + 1}. {stop.name}
                </Button>
              </li>
            )}
          </ol>
        </CardContent>
      </Card>
    </aside>
  );
}

export default function InfoExplorer() {
    const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
    return(
        <main className="grid flex-1 grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
            <MapSection
                selectedStopId={selectedStopId}
                onSelectStop={setSelectedStopId}/>
            <InfoPanel
              selectedStopId={selectedStopId}
              onSelectStop={setSelectedStopId}
            />
        </main>
    );
} */

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Route } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getBusStops, BusStop } from '@/lib/stop-data';

// Dynamically import Map with SSR disabled for Leaflet compatibility
const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Loading map engine...
    </div>
  ),
});

type MapSectionProps = {
  stops: BusStop[];
  selectedStopId: number | null;
  onSelectStop: (stopId: number) => void;
};


function MapSection({
  stops,
  selectedStopId,
  onSelectStop,
}: MapSectionProps) {
  return (
    <section
      aria-label="Route map"
      className="relative isolate h-full min-h-0 w-full
        bg-slate-100
        md:col-start-2 md:row-start-1"
    >
      <Map
        stops={stops}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
      />
    </section>
  );
}


type InfoPanelProps = {
  stops: BusStop[];
  selectedStopId: number | null;
  onSelectStop: (stopId: number) => void;
};

function InfoPanel({ stops, selectedStopId, onSelectStop }: InfoPanelProps) {
  const selectedStop = stops.find((stop) => stop.id === selectedStopId);

  return (
    <aside
      id="bus-route-info"
      aria-labelledby="route-heading"
      className="h-full min-h-0 overflow-y-auto overscroll-contain
        space-y-3 p-3 wrap-anywhere
        md:col-start-1 md:row-start-1 md:border-r md:p-4"
    >
      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground">BUS AND STOP INFO</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            {selectedStop ? selectedStop.name : ''}
          </h2>
        </CardHeader>
        <CardContent>
          <p role="status" className="sr-only">
            {selectedStop ? `Selected stop: ${selectedStop.name}` : ''}
          </p>
          {selectedStop ? (
            <div className="p-1">
              <p className="text-sm leading-6 text-muted-foreground">
                Lat: {selectedStop.latitude.toFixed(5)}, Lng: {selectedStop.longitude.toFixed(5)}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-background px-4 py-6 text-center">
              <MapPin aria-hidden="true" className="mx-auto mb-3 size-6 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">
                Select a stop to view details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-xs font-medium text-muted-foreground">YOUR BUS ROUTE</p>
          <div className="mt-1 flex items-start gap-3">
            <Route aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 id="route-heading" className="text-lg font-semibold tracking-tight">
                Rizal Bus Route
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{stops.length} stops • Click to learn more</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ol aria-label="Route stops" className="space-y-2">
            {stops.map((stop, index) => (
              <li key={stop.id}>
                <Button
                  aria-pressed={selectedStopId === stop.id}
                  variant={selectedStopId === stop.id ? 'default' : 'outline'}
                  onClick={() => onSelectStop(stop.id)}
                  className="h-auto min-h-11 w-full justify-start text-left whitespace-normal"
                >
                  {index + 1}. {stop.name}
                </Button>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </aside>
  );
}

export default function InfoExplorer() {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStops() {
      const data = await getBusStops();
      setStops(data);
      if (data.length > 0) {
        setSelectedStopId(data[0].id);
      }
      setLoading(false);
    }
    loadStops();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading bus stops...</p>
      </div>
    );
  }

  return (
    <main className="grid h-[calc(100svh-4rem)] min-h-0 w-full
      grid-cols-1 overflow-hidden
      md:grid-cols-[280px_minmax(0,1fr)]">
      <MapSection
        stops={stops}
        selectedStopId={selectedStopId}
        onSelectStop={setSelectedStopId}
      />
      <InfoPanel
        stops={stops}
        selectedStopId={selectedStopId}
        onSelectStop={setSelectedStopId}
      />
    </main>
  );
}