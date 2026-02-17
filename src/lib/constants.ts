export const BINANCE_API_URL = "https://api.binance.com/api/v3";

export const BINANCE_SOCKET_URL = "wss://stream.binance.com:443/ws";


export const CURRENCY_PAIRS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "SOLUSDT",
  "ADAUSDT",
  "DOTUSDT",
  "LINKUSDT",
  "BCHUSDT",
];

const INITIAL_DATA = [];

for (let c of CURRENCY_PAIRS) {
  let o = {
    mins: "-",
    price: "Loading...",
    symbol: c
  }
  INITIAL_DATA.push(o)
}

export { INITIAL_DATA } 