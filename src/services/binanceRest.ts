import { BINANCE_API_URL } from "@/lib/constants";
import axios from "axios";

export const ping = async () => {
  const res = await axios.get(`https://api.binance.com`, { timeout: 10000 });
  if (res.status == 200) return true;
  return false;
}

export const getTrades = async (symbol: string, limit = 20) => {
  const response = await axios.get(`${BINANCE_API_URL}/trades?symbol=${symbol}&limit=${limit}`);
  return response.data;
};

export const getDepth = async (symbol: string, limit = 20) => {
  const response = await axios.get(`${BINANCE_API_URL}/depth?symbol=${symbol}&limit=${limit}`);
  return response.data;
};


export const getAvgPrice = async (symbol: string) => {
  const response = await axios.get(`${BINANCE_API_URL}/avgPrice?symbol=${symbol}`, { timeout: 20000 });
  if (response.data) {
    response.data.symbol = symbol;
  }
  return response.data;
};

export const getBatchAvgPrice = async (symbols: string[]) => {
  try {
    const response = await Promise.all(symbols.map(symbol => getAvgPrice(symbol)));
    console.log('the response is ', response);
    return response;
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
};
