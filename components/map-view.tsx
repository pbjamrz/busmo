"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
    ssr: false,
    loading: () => <p role="status">Loading map...</p>,
});

export default function MapView() {
    return <Map />;
}