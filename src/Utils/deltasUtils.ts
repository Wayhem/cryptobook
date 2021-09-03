import { XBTUSD_GROUPS_ENUM, ETHUSD_GROUPS_ENUM } from 'Models/constants/groups'
import Delta, { DeltaWithoutTotal } from 'Models/Delta'
import OrdersBook from 'Models/OrderBook'

function getClosestMultiple(x: number, y: number) {
  return Math.round(x / y) / (1 / y)
}

function isMultiple(x: number, y: number) {
  return getClosestMultiple(x, y) === x
}

const groupDeltasByNumber = (group: XBTUSD_GROUPS_ENUM | ETHUSD_GROUPS_ENUM, deltas: Delta[]) => {
  const groupedDeltas = [] as Delta[]
  if (Array.isArray(deltas) && deltas.length) {
    deltas.forEach(delta => {
      if (groupedDeltas.length === 0) {
        groupedDeltas.push([getClosestMultiple(delta[0], group), delta[1], delta[2]])
      } else if (isMultiple(delta[0], group) && delta[0] !== groupedDeltas[groupedDeltas.length - 1][0]) {
        groupedDeltas.push(delta)
      } else if (getClosestMultiple(delta[0], group) === groupedDeltas[groupedDeltas.length - 1][0]) {
        groupedDeltas[groupedDeltas.length - 1][1] += delta[1]
        groupedDeltas[groupedDeltas.length - 1][2] += delta[2]
      } else {
        groupedDeltas.push([getClosestMultiple(delta[0], group), delta[1], delta[2]])
      }
    })
  }
  return groupedDeltas
}

const getUpdatedDeltas = (newDeltas: DeltaWithoutTotal[], currentOrderBook: OrdersBook, isAsks: boolean): Delta[] => {
  const currentDeltas = isAsks ? [...currentOrderBook.asks] : [...currentOrderBook.bids]

  newDeltas.forEach((newDelta: DeltaWithoutTotal) => {
    if (newDelta[1] === 0) {
      for (const [currentDeltaIndex, currentDelta] of currentDeltas.entries()) {
        if (currentDelta[0] === newDelta[0]) {
          currentDeltas.splice(currentDeltaIndex, 1)
          break
        }
      }
    } else if (
      isAsks
        ? newDelta[0] > currentDeltas[currentDeltas.length - 1][0]
        : newDelta[0] < currentDeltas[currentDeltas.length - 1][0]
    ) {
      currentDeltas.push([newDelta[0], newDelta[1], newDelta[1]])
    } else if (isAsks ? newDelta[0] < currentDeltas[0][0] : newDelta[0] > currentDeltas[0][0]) {
      currentDeltas.unshift([newDelta[0], newDelta[1], newDelta[1]])
    } else {
      for (const [currentDeltaIndex, currentDelta] of currentDeltas.entries()) {
        if (currentDelta[0] === newDelta[0]) {
          currentDeltas[currentDeltaIndex][1] = newDelta[1]
          currentDeltas[currentDeltaIndex][2] += newDelta[1]
        } else if (
          isAsks
            ? currentDelta[0] > newDelta[0] && currentDeltas[currentDeltaIndex - 1][0] < newDelta[0]
            : currentDelta[0] < newDelta[0] && currentDeltas[currentDeltaIndex - 1][0] > newDelta[0]
        ) {
          currentDeltas.splice(currentDeltaIndex, 0, [newDelta[0], newDelta[1], newDelta[1]])
        }
      }
    }
  })

  return currentDeltas
}

export { groupDeltasByNumber, getUpdatedDeltas }
