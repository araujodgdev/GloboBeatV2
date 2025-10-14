import {create} from 'zustand'


const useSearchQueryStore = create((set) => ({
  query: '',
  setQuery: (query: string) => set({query}),
}))


export default useSearchQueryStore;

