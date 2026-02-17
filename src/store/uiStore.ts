import { create } from 'zustand';

export type WatchlistState = {
  watchlist: string[] | undefined,
  addToWatchList: (pair: string) => void,
  removeFromWatchlist: (pair: string) => void,
  setWatchlist: (w: string[]) => void,
  empteyWatchlist: () => void
}


export const useWatchListStore = create<WatchlistState>((set) => ({
  watchlist: [],
  addToWatchList: (pair) => set(state => {
    if (!state.watchlist.includes(pair)) {
      return { watchlist: [...state.watchlist, pair] }
    } else return state;
  }),
  removeFromWatchlist: (pair) => set(state => {
    if (state.watchlist.includes(pair)) {
      return { watchlist: state.watchlist.filter(p => p !== pair) }
    } else return state;
  }),
  setWatchlist: (w: string[]) => set(() => {
    return { watchlist: w }
  }),
  empteyWatchlist: () => set(state => {
    return { watchlist: [] }
  }),
}));

export type ConnnectionStore = {
  connected: Boolean,
  setConnected: (c: Boolean) => void
}

export const useConnectionStore = create<ConnnectionStore>((set) => ({
  connected: false,
  setConnected: (c: Boolean) => set(() => {
    return { connected: c }
  }),
}));