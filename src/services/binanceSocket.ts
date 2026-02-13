import { BINANCE_SOCKET_URL } from "@/lib/constants";
import { EventEmitter } from "eventemitter3";

export type SocketMessage = unknown;
export type SocketSubscriber = (message: SocketMessage) => void;

class BinanceSocketManager {
  private static _instance: BinanceSocketManager | null = null;

  socket: WebSocket | null = null;
  readonly subscribers = new Set<SocketSubscriber>();
  isConnected = false;
  emitter = new EventEmitter()

  constructor() {
    if (typeof window !== "undefined") {
      this.connect();
    }
  }

  static getInstance(): BinanceSocketManager {
    if (!this._instance) {
      this._instance = new BinanceSocketManager();
    }
    return this._instance;
  }

  private connect() {
    if (this.socket || typeof window === "undefined") return;

    this.socket = new WebSocket(BINANCE_SOCKET_URL);

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('binance websocket connected');
      this.emitter.emit('connected');
    };

    this.socket.onmessage = (event: MessageEvent) => {
      let payload: SocketMessage = event.data;
      try {
        payload = JSON.parse(event.data as string);
      } catch {

      }
      this.subscribers.forEach((callback) => callback(payload));
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      this.socket = null;
      this.emitter.emit('disconnected');
    };

  }

  subscribe(callback: SocketSubscriber): () => void {
    this.subscribers.add(callback);

    if (!this.socket && typeof window !== "undefined") {
      this.connect();
    }

    return () => {
      this.subscribers.delete(callback);

      if (this.subscribers.size === 0 && this.socket) {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
      }
    };
  }

  send(data: unknown) {
    if (this.socket && this.isConnected) {
      const payload = typeof data === "string" ? data : JSON.stringify(data);
      this.socket.send(payload);
    }
  }
}

export const binanceSocketManager = BinanceSocketManager.getInstance();

