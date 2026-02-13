export type AvgPrice = {
  closeTime: number;
  mins: number;
  price: string;
  symbol?: string;
};

export type Trade = {
  id: number
  price: number
  qty: number
  quoteQty: number
  time: number
  isBuyerMaker: boolean
  isBestMatch: boolean
}