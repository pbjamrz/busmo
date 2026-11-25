/* import { useState } from "react";
import { divIcon } from "leaflet";

import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { stops } from "@/lib/stop-data";

const routePositions = stops.map((stop) => stop.coordinates)

function StopIcon(stopNumber: number, isSelected: boolean) {
    return divIcon({
       className: isSelected
            ? "stop-marker is-selected"
            : "stop-marker",
        html: String(stopNumber),
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -22]
    });
}

type MapProps = {
    selectedStopId: string | null;
    onSelectStop: (stopId: string) => void;
};

export default function Map({ selectedStopId, onSelectStop }: MapProps) {
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
                color: "rgb(37 99 235 / 0.84)",
                weight: 5,
            }}
          />

          {stops.map((stop, index) => (
              <Marker
                key={stop.id}
                position={stop.coordinates}
                title={`${index + 1}. ${stop.name}`}
                icon={StopIcon(index + 1, selectedStopId === stop.id)}
                eventHandlers={{
                    click: () => onSelectStop(stop.id),
                }}
              >
                  <Popup
                    className="stop-popup"
                    maxWidth={220}
                    autoPanPadding={[16, 16]}
                  >
                    <div className="space-y-1 pr-6">
                        <strong className="block font-semibold">
                            {stop.name}
                        </strong>
                        <div>
                            {stop.description}
                        </div>
                    </div>
                  </Popup>

              </Marker>
          ))}
      </MapContainer>
    );
} */

'use client';

import { useEffect, useState } from "react";
import { divIcon, LatLngTuple } from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { BusStop } from "@/lib/stop-data";

function StopIcon(stopNumber: number, isSelected: boolean) {
    return divIcon({
        className: isSelected
            ? "stop-marker is-selected"
            : "stop-marker",
        html: String(stopNumber),
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -22]
    });
}

// Controller component to fix container sizing & handle smooth panning when a stop is selected
function MapController({ 
    routePositions, 
    selectedStop 
}: { 
    routePositions: LatLngTuple[]; 
    selectedStop?: BusStop;
}) {
    const map = useMap();

    useEffect(() => {
        // Force Leaflet to recalculate container bounds after mount
        map.invalidateSize();
    }, [map]);

    useEffect(() => {
        if (selectedStop) {
            map.flyTo([selectedStop.latitude, selectedStop.longitude], Math.max(map.getZoom(), 14), {
                duration: 0.8,
            });
        }
    }, [selectedStop, map]);

    return null;
}

type MapProps = {
    stops: BusStop[];
    selectedStopId: number | null;
    onSelectStop: (stopId: number) => void;
};

export default function Map({ stops, selectedStopId, onSelectStop }: MapProps) {
    const [hasTileError, setHasTileError] = useState(false);

    // Convert stops to Leaflet [lat, lng] tuple format
    const routePositions: LatLngTuple[] = stops.map((stop) => [
        stop.latitude,
        stop.longitude
    ]);

    const selectedStop = stops.find((stop) => stop.id === selectedStopId);

    // Don't render MapContainer until stops data is loaded
    if (!stops || stops.length === 0) {
        return (
            <div className="flex h-full min-h-[400px] w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                Loading map route...
            </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-0">
            <MapContainer
                bounds={routePositions}
                boundsOptions={{
                    padding: [32, 32]
                }}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
                style={{ height: "100%", width: "100%" }}
            >
                <MapController routePositions={routePositions} selectedStop={selectedStop} />
                
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                    eventHandlers={{
                        tileerror: () => setHasTileError(true),
                    }}
                />
                {hasTileError && (
                    <p 
                        role="status"
                        className="pointer-events-none absolute bottom-8 left-3 right-3 z-[1000] rounded-lg border bg-accent text-accent-foreground px-3 p-0.5 text-sm"
                    >
                        Map tile could not load. Check your internet connection and reload the page.
                    </p>
                )}

                <Polyline
                    positions={routePositions}
                    pathOptions={{
                        color: "rgb(37 99 235 / 0.84)",
                        weight: 5,
                    }}
                />

                {stops.map((stop, index) => {
                    const position: LatLngTuple = [stop.latitude, stop.longitude];
                    
                    return (
                        <Marker
                            key={stop.id}
                            position={position}
                            title={`${index + 1}. ${stop.name}`}
                            icon={StopIcon(index + 1, selectedStopId === stop.id)}
                            eventHandlers={{
                                click: () => onSelectStop(stop.id),
                            }}
                        >
                            <Popup
                                className="stop-popup"
                                maxWidth={220}
                                autoPanPadding={[16, 16]}
                            >
                                <div className="space-y-1 pr-6">
                                    <strong className="block font-semibold">
                                        {stop.name}
                                    </strong>
                                    <div className="text-xs text-muted-foreground">
                                        Lat: {stop.latitude.toFixed(5)}, Lng: {stop.longitude.toFixed(5)}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}