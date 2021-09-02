import Entities from 'Models/Entities'
import { resourceEntity } from 'Models/resourceEntities'
import OrderBook, { OrderBookWithoutTotals } from 'Models/OrderBook'
import Delta, { DeltaWithoutTotal } from 'Models/Delta'

export const unformatInitialSnapshotOrderBook = (data: OrderBookWithoutTotals): OrderBook => {
  const mapDeltas = (deltas: DeltaWithoutTotal[]): Delta[] =>
    deltas.map((delta: DeltaWithoutTotal): Delta => [delta[0], delta[1], delta[1]])
  const newAsks = mapDeltas(data.asks)
  const newBids = mapDeltas(data.bids)
  return { asks: newAsks, bids: newBids }
}

type unformatterFunctions = (...args: any[]) => resourceEntity

const unformatters = new Map<Entities, unformatterFunctions>([
  [Entities.ORDER_BOOK, unformatInitialSnapshotOrderBook],
  [Entities.DEBOUNCED_ORDER_BOOK, unformatInitialSnapshotOrderBook],
])

export { unformatters }
