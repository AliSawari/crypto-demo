import { CURRENCY_PAIRS } from "@/lib/constants"

export type WS_EventType = "avgPrice" | "depth"


export type WS_Event = {
  E: number, // emit time? not sure
  T: number, // T is time
  e: WS_EventType, // event type
  i: string, // time period
  s: string, // symbol
  w: string // price
}
