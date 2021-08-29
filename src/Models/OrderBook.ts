import Delta, { DeltaWithoutTotal } from 'Models/Delta'

export const orderBookBuilder = (asks: Delta[] = [], bids: Delta[] = []): OrdersBook => ({ asks, bids })

export interface OrderBookWithoutTotals {
  asks: DeltaWithoutTotal[]
  bids: DeltaWithoutTotal[]
}

interface OrdersBook {
  asks: Delta[]
  bids: Delta[]
}

export default OrdersBook
