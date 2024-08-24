import { create } from 'zustand'
import { LatLng, latLng } from "leaflet";

interface MarkerState {
  marker: LatLng | null;
  addMarker: (latlng: LatLng) => void;
}

interface selectedPostState{
  selectedPostId: string
  addPostId: (postId: string) => void;
}

interface selectedNoteIdStore{
  searchedPostId: string
  searchedNoteId: string
  addData: (postId: string, noteId:string) => void;
}

export  const useMarkerStore = create<MarkerState>((set) => ({
  marker: null,
  addMarker: (latlng) => set(() => ({ marker: latlng })),
}));

export  const useSelectedPostStore = create<selectedPostState>((set) => ({
  selectedPostId: '',
addPostId: (postId) => set(() => ({ selectedPostId: postId })),
}));

export const useSerachDataStore = create<selectedNoteIdStore>((set) => ({
  searchedPostId: '',
  searchedNoteId: '',
addData: (postId, noteId) => set(() => ({ searchedPostId: postId, searchedNoteId: noteId })),
}));