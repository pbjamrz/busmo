export type Stop = {
    id: string;
    name: string;
    description: string;
    coordinates: [latitude: number, longitude: number];
}

// Dummy coordinates
export const stops: Stop[] = [
  {
    id: "imatong-court",
    name: "Imatong Court",
    description: "Sample stop",
    coordinates: [14.514, 121.242],
  },
  {
    id: "savemore-market",
    name: "Savemore Market",
    description: "Sample stop",
    coordinates: [14.518, 121.247],
  },
  {
    id: "petron-station",
    name: "Petron Station",
    description: "Sample stop",
    coordinates: [14.522, 121.253],
  },
  {
    id: "jollibee-baras",
    name: "Jollibee Baras",
    description: "Sample stop",
    coordinates: [14.526, 121.259],
  },
  {
    id: "sagbat",
    name: "Sagbat",
    description: "Sample stop",
    coordinates: [14.531, 121.249],
  },
  {
    id: "tomas-claudio-colleges",
    name: "Tomas Claudio Colleges",
    description: "Sample stop",
    coordinates: [14.524, 121.243],
  },
];