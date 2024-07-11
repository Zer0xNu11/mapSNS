//未使用
//Store

import { create } from 'zustand'

type PostState = {
  text: string;
  setText: (text: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  text: 'Guest',
  setText: (text) => set({ text: text }),
}));

export default usePostStore;

//componennt側


const postStore = usePostStore();