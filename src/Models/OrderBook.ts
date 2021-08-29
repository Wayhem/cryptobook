import Delta from 'Models/Delta'

export const orderBookBuilder = (asks: Delta[] = [], bids: Delta[] = []): OrdersBook => ({ asks, bids })

interface OrdersBook {
  asks: Delta[]
  bids: Delta[]
}

export default OrdersBook
