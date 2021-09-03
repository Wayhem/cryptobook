import WSMessage from 'Models/WSMessage'
import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import FeedTypes from 'Models/constants/feedTypes'
import { XBTUSD_GROUPS_ENUM } from 'Models/constants/groups'
import Delta from 'Models/Delta'

const buildToggleWSMessage = (event: WSMessageEvents, productId: ProductIds): WSMessage => ({
  event,
  feed: FeedTypes.standard,
  product_ids: [productId],
})

function getClosestMultiple(x: number, y: number) {
  return Math.round(x / y) / (1 / y)
}

function isMultiple(x: number, y: number) {
  return getClosestMultiple(x, y) === x
}

const groupDeltasByNumber = (group: XBTUSD_GROUPS_ENUM, deltas: Delta[]) => {
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

export { buildToggleWSMessage, groupDeltasByNumber }
