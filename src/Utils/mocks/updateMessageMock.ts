import { OrderBookWithoutTotals } from 'Models/OrderBook'

const messageMock: OrderBookWithoutTotals = {
  bids: [
    [50092.5, 0],
    [50098, 31913],
    [50100.5, 1975],
    [50121, 0],
  ],
  asks: [
    [50177, 0],
    [50177.5, 570],
    [50179.5, 28000],
    [50180, 0],
    [50180.5, 9052],
    [50183, 20000],
    [50184.5, 10000],
    [50187, 0],
    [50188, 0],
    [50224, 0],
    [50244.5, 2083],
  ],
}

export { messageMock }
