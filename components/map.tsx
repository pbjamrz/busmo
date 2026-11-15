import {useState} from "react";
import {divIcon} from "leaflet";
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";

import {stops} from "@/lib/stop-data";

const routePositions = stops.map((stop) => stop.coordinates)

function StopIcon(stopNumber: number) {
    return divIcon({
       className: "stop-marker",
        html: String(stopNumber),
        iconSize: [44, 44],
        iconAnchor: [22, 22]
    });
}

export default function Map() {
    const [hasTileError, setHasTileError] = useState(false);

    return (
      <MapContainer
          bounds={routePositions}
          boundsOptions={{
              padding: [32, 32]
          }}
          scrollWheelZoom={false}
          className="h-full w-full"
      >
          <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
              eventHandlers={{
                    tileerror: () => setHasTileError(true),
              }}
        />
          {hasTileError && (
              <p role="status"
                 className="pointer-events-none absolute bottom-8 left-3 right-3 z-1000 rounded-lg border bg-accent text-accent-foreground px-3 p-0.5">
                  Map tile could not load. Check your internet connection and reload the page.
              </p>
          )}

          <Polyline
            positions = {routePositions}
            pathOptions={{
                color: "#2563eb",
                weight: 5,
            }}
          />

          {stops.map((stop, index) => (
              <Marker
                key={stop.id}
                position={stop.coordinates}
                title={`${index + 1}. ${stop.name}`}
                icon={StopIcon(index + 1)}
              />
          ))}
      </MapContainer>
    );
}