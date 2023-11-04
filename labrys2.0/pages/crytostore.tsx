import { create } from 'zustand'

const useStore = create((set) => ({
    favorites: [],
    addToFavorites: (crypto) => set((state) => ({ favorites: [...state.favorites, crypto] })),

}))
export default useStore;