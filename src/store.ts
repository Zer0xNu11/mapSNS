import { create } from 'zustand'
import { LatLng, latLng } from "leaflet";

interface MarkerState {
  marker: LatLng | null;
  addMarker: (latlng: LatLng) => void;
}

export  const useMarkerStore = create<MarkerState>((set) => ({
  marker: null,
  addMarker: (latlng) => set(() => ({ marker: latlng })),
}));