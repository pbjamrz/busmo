import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
    ssr: false,
    loading: () => <p role="status">Loading map...</p>,
});

type MapViewProps = {
    selectedStopId: string | null;
    onSelectStop: (stopId: string) => void;
};

export default function MapView({ selectedStopId, onSelectStop }: MapViewProps) {
    return <Map selectedStopId={selectedStopId} onSelectStop={onSelectStop}/>;
}