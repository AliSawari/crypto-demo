import { BINANCE_API_URL, CURRENCY_PAIRS } from "@/lib/constants";
import axios from "axios";


export const getTrades = async (symbol: string, limit = 20) => {
  const response = await axios.get(`${BINANCE_API_URL}/trades?symbol=${symbol}&limit=${limit}`);
  return response.data;
};

export const getDepth = async (symbol: string, limit = 20) => {
  const response = await axios.get(`${BINANCE_API_URL}/depth?symbol=${symbol}&limit=${limit}`);
  return response.data;
};


export const getAvgPrice = async (symbol: string) => {
  const response = await axios.get(`${BINANCE_API_URL}/avgPrice?symbol=${symbol}`);
  if(response.data){
    response.data.symbol = symbol;
  }
  return response.data;
};

export const getBatchAvgPrice = async (symbols: string[]) => {
  const response = await Promise.all(symbols.map(symbol => getAvgPrice(symbol)));
  console.log('the response is ', response);
  return response;
};
