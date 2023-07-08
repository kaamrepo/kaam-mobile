import { create } from 'zustand';
const useLoaderStore = create((set, get) => ({
    isLoading: false,
    setLoading: (value) =>
    {
        set({ isLoading: value })
    }
}))

export default useLoaderStore;