import { create } from 'zustand';
import { CURRENCY_PAIRS } from '@/lib/constants';

const currencies = {}
CURRENCY_PAIRS.forEach(c => {
  currencies[c] = 0;
})

export type WsState = {
  livePrices: {},
  setPrice: (symbol: string, price: string) => void,
  isConnected: boolean,
  setIsConnected: (status: boolean) => void
}

export const useWSStore = create<WsState>((set) => ({
  livePrices: currencies,
  isConnected: false,
  setPrice: (symbol, price) => set(state => {
    let l = {...state.livePrices}
    l[symbol] = price
    return {...state, livePrices: l};
  }),
  setIsConnected: (status) => set(state => {
    return { ...state, isConnected: status }
  }) 
}))