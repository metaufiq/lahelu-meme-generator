import { create } from 'zustand';

export interface State {
  images: Record<string, boolean>;
  addImage: (url: string) => void;
}

const useCacheStatusStore = create<State>((set) => ({
  images: {},
  addImage: (url) => {
    set((state) => ({
      images: { ...state.images, [url]: true },
    }));
  },
}));

export default useCacheStatusStore;
