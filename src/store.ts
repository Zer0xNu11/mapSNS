import { create } from 'zustand'
import { LatLng, latLng } from "leaflet";
import { PlanPointType } from './types';

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

interface selectedPlanPointState{
  selectedPlanPointId: string | null
  setSelectedPlanPointId: (planPointId: string | null) => void;
}

interface postDisplayModeState{
  postDisplayMode: string
  setPostDisplayMode: (postMode: string ) => void;
}

interface listDisplayModeState{
  listDisplayMode: string
  setListDisplayMode: (listMode: string ) => void;
}

interface planListDisplayModeState{
  planListDisplayMode: string
  setPlanListDisplayMode: (listMode: string ) => void;
}

interface planSlotState{
  planSlot: PlanPointType[]
  setPlanSlot: (slot: PlanPointType[] ) => void;
}

export  const useMarkerStore = create<MarkerState>((set) => ({
  marker: null,
  addMarker: (latlng) => set(() => ({ marker: latlng })),
}));

export  const useSelectedPostStore = create<selectedPostState>((set) => ({
  selectedPostId: null,
setSelectedPostId: (postId) => set(() => ({ selectedPostId: postId })),
}));

export  const useSelectedPlanPointStore = create<selectedPlanPointState>((set) => ({
  selectedPlanPointId: null,
setSelectedPlanPointId: (planPointId) => set(() => ({ selectedPlanPointId: planPointId })),
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

export  const usePlanListDisplayMode = create<planListDisplayModeState>((set) => ({
  planListDisplayMode: 'list',
  setPlanListDisplayMode:  (mode) => set(() => ( { planListDisplayMode: `${mode}` }))
}));

export  const usePlanSlot = create<planSlotState>((set) => ({
  planSlot: [],
  setPlanSlot:  (slot) => set(() => ( { planSlot: slot }))
}));