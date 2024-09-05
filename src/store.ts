import { create } from 'zustand'
import { LatLng, latLng } from "leaflet";

interface MarkerState {
  marker: LatLng | null;
  addMarker: (latlng: LatLng) => void;
}

interface selectedPostState{
  selectedPostId: string | null
  setSelectedPostId: (postId: string | null) => void;
}

interface selectedNoteIdStore{
  searchedPostId: string
  searchedNoteId: string
  addData: (postId: string, noteId:string) => void;
}

interface selectedPlanState{
  selectedPlanId: string | null
  setSelectedPlanId: (planId: string | null) => void;
}

interface postDisplayModeState{
  postDisplayMode: string
  setPostDisplayMode: (postMode: string ) => void;
}

interface listDisplayModeState{
  listDisplayMode: string
  setListDisplayMode: (listMode: string ) => void;
}

export  const useMarkerStore = create<MarkerState>((set) => ({
  marker: null,
  addMarker: (latlng) => set(() => ({ marker: latlng })),
}));

export  const useSelectedPostStore = create<selectedPostState>((set) => ({
  selectedPostId: null,
setSelectedPostId: (postId) => set(() => ({ selectedPostId: postId })),
}));

export  const useSelectedPlanStore = create<selectedPlanState>((set) => ({
  selectedPlanId: null,
setSelectedPlanId: (planId) => set(() => ({ selectedPlanId: planId })),
}));

export const useSerachDataStore = create<selectedNoteIdStore>((set) => ({
  searchedPostId: '',
  searchedNoteId: '',
addData: (postId, noteId) => set(() => ({ searchedPostId: postId, searchedNoteId: noteId })),
}));

export  const usePostDisplayMode = create<postDisplayModeState>((set) => ({
  postDisplayMode: 'pict',
  setPostDisplayMode:  (mode) => set(() => ( { postDisplayMode: `${mode}` }))
}));

export  const useListDisplayMode = create<listDisplayModeState>((set) => ({
  listDisplayMode: 'list',
  setListDisplayMode:  (mode) => set(() => ( { listDisplayMode: `${mode}` }))
}));