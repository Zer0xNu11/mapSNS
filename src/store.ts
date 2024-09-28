import { create } from 'zustand'
import { LatLng } from "leaflet";
import { NoteSlotType, PlanSlotType } from './types';
import { mapStyles } from './lib/mapSetting';

interface MarkerState {
  marker: LatLng | null;
  setMarker: (latlng: LatLng) => void;
}

interface UserMarkerState {
  userMarker: LatLng | null;
  setUserMarker: (latlng: LatLng) => void;
}

interface FocusCoordinateState{
  focusCoordinate: LatLng | null;
  setFocusCoordinate: (latlng: LatLng) => void;
}

interface selectedPostState{
  selectedPostId: string | null
  setSelectedPostId: (postId: string | null) => void;
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


interface searchedNoteSlotState{
  searchedNoteSlot: NoteSlotType[]
  setSearchedNoteSlot: (data:NoteSlotType[]) => void;
}

interface planSlotState{
  planSlot: PlanSlotType[]
  setPlanSlot: (data:PlanSlotType[]) => void;
}

interface postsSlotState{
  postsSlot: NoteSlotType[]
  setPostsSlot: (data:NoteSlotType[]) => void;
}

interface editNoteState{
  editNoteData:{
    id: string;
    title: string;
  }
  setEditNoteData: (id: string, title: string) => void;
}

interface editPlanState{
  editPlanData:{
    id: string;
    title: string;
  }
  setEditPlanData: (id: string, title: string) => void;
}

interface mapStyleState{
  mapStyle: {attribution: string, style: string}
  setMapStyle: (style: {attribution: string, style: string}) => void;
}

export  const useMarkerStore = create<MarkerState>((set) => ({
  marker: null,
  setMarker: (latlng) => set(() => ({ marker: latlng })),
}));

export  const useUserMarkerStore = create<UserMarkerState>((set) => ({
  userMarker: null,
  setUserMarker: (latlng) => set(() => ({ userMarker: latlng })),
}));

export  const useFocusCoordinate = create<FocusCoordinateState>((set) => ({
  focusCoordinate: null,
  setFocusCoordinate: (latlng) => set(() => ({ focusCoordinate: latlng })),
}));


export  const useSelectedPostStore = create<selectedPostState>((set) => ({
  selectedPostId: null,
setSelectedPostId: (postId) => set(() => ({ selectedPostId: postId })),
}));

export  const useSelectedPlanPointStore = create<selectedPlanPointState>((set) => ({
  selectedPlanPointId: null,
setSelectedPlanPointId: (planPointId) => set(() => ({ selectedPlanPointId: planPointId })),
}));

export  const usePostDisplayMode = create<postDisplayModeState>((set) => ({
  postDisplayMode: 'pict',
  setPostDisplayMode:  (mode) => set(() => ( { postDisplayMode: `${mode}` }))
}));

export  const useListDisplayMode = create<listDisplayModeState>((set) => ({
  listDisplayMode: 'map',
  setListDisplayMode:  (mode) => set(() => ( { listDisplayMode: `${mode}` }))
}));

export  const usePlanListDisplayMode = create<planListDisplayModeState>((set) => ({
  planListDisplayMode: 'map',
  setPlanListDisplayMode:  (mode) => set(() => ( { planListDisplayMode: `${mode}` }))
}));

export  const useNoteSlot = create<noteSlotState>((set) => ({
  noteSlot: [],
  setNoteSlot:  (data:NoteSlotType[]) => set(() => ({ noteSlot: data }))
}));

export  const useSearchedNoteSlot = create<searchedNoteSlotState>((set) => ({
  searchedNoteSlot: [],
  setSearchedNoteSlot:  (data:NoteSlotType[]) => set(() => ({ searchedNoteSlot: data }))
}));

export  const usePlanSlot = create<planSlotState>((set) => ({
  planSlot: [],
  setPlanSlot:  (data:PlanSlotType[]) => set(() => ({ planSlot: data }))
}));

export const usePostsSlot = create<postsSlotState>((set) => ({
  postsSlot: [],
  setPostsSlot: (data: NoteSlotType[]) => set(() => ({ postsSlot: data }))
}));

export const useEditNote = create<editNoteState>((set) => ({
  editNoteData: {
    id:'',
    title:'',
  },
  setEditNoteData: (id: string, title: string) => set(() => ({ editNoteData:{id:id, title: title } }))
}));

export const useEditPlan = create<editPlanState>((set) => ({
  editPlanData: {
    id:'',
    title:'',
  },
  setEditPlanData: (id: string, title: string) => set(() => ({ editPlanData:{id:id, title: title } }))
}));

export const useMapStyle = create<mapStyleState>((set) => ({
  mapStyle: mapStyles.blackWhite,
  setMapStyle: (style) => set(() => ({ mapStyle: style }))
}));
