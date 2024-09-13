import { create } from 'zustand'
import { LatLng } from "leaflet";
import { NoteSlotType, PlanSlotType } from './types';

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

interface noteSlotState{
  noteSlot: NoteSlotType[]
  setNoteSlot: (data:NoteSlotType[]) => void;
}


interface planSlotState{
  planSlot: PlanSlotType[]
  setPlanSlot: (data:PlanSlotType[]) => void;
}

interface postsSlotState{
  postsSlot: NoteSlotType[]
  setPostsSlot: (data:NoteSlotType[]) => void;
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

export  const useNoteSlot = create<noteSlotState>((set) => ({
  noteSlot: [],
  setNoteSlot:  (data:NoteSlotType[]) => set(() => ({ noteSlot: data }))
}));

export  const usePlanSlot = create<planSlotState>((set) => ({
  planSlot: [],
  setPlanSlot:  (data:PlanSlotType[]) => set(() => ({ planSlot: data }))
}));

export const usePostsSlot = create<postsSlotState>((set) => ({
  postsSlot: [],
  setPostsSlot: (data: NoteSlotType[]) => set(() => ({ postsSlot: data }))
}));
