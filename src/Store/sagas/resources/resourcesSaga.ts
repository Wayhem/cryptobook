import { takeEvery, put, select, takeLatest, delay, race, take, call } from 'redux-saga/effects'
import { StandardAction } from 'Store/actions/resourceActions'
import ResourcesTypes from 'Store/types/resourceTypes'
import { orderBookSelector } from 'Store/selectors/resourceSelectors'
import { unformatters as resourceUnformatters } from 'Utils/formatters/resourceUnformatters'
import Delta, { DeltaWithoutTotal } from 'Models/Delta'
import Entities from 'Models/Entities'

export function* fetchedResource(action: StandardAction): Generator {
  const entity = action.entity
  try {
    if (!entity) throw Error('no entity selected')
    const unformatter = resourceUnformatters.get(entity)
    let { payload } = action
    if (unformatter) payload = unformatter(payload)
    yield put({ type: ResourcesTypes.RESOURCE_SUCCESS, entity, payload })
  } catch (e: any) {
    yield put({ type: ResourcesTypes.RESOURCE_ERROR, payload: e.message })
  }
}

export function* updateOrderBook(action: StandardAction): Generator {
  const currentOrderBook: any = yield select(orderBookSelector)

  const { asks, bids } = action.payload

  asks.forEach((delta: DeltaWithoutTotal) => {
    if (delta[1] === 0) {
      currentOrderBook?.asks.forEach((currentDelta: Delta, index: number) => {
        if (currentDelta[0] === delta[0]) {
          currentOrderBook.asks.splice(index, 1)
        }
      })
    } else if (delta[0] > currentOrderBook?.asks[currentOrderBook.asks.length - 1][0]) {
      currentOrderBook?.asks.push([...delta, delta[1]])
    } else if (delta[0] < currentOrderBook?.asks[0][0]) {
      currentOrderBook?.asks.unshift([...delta, delta[1]])
    } else {
      currentOrderBook?.asks.forEach((currentDelta: Delta, index: number) => {
        if (currentDelta[0] === delta[0]) {
          currentOrderBook.asks[index][1] = delta[1]
          currentOrderBook.asks[index][2] += delta[1]
        }
        if (currentDelta[0] > delta[0] && currentOrderBook.asks[index - 1][0] < delta[0]) {
          currentOrderBook.asks.splice(index, 0, [...delta, delta[1]])
        }
      })
    }
  })

  bids.forEach((delta: DeltaWithoutTotal) => {
    if (delta[1] === 0) {
      currentOrderBook?.bids.forEach((currentDelta: Delta, index: number) => {
        if (currentDelta[0] === delta[0]) {
          currentOrderBook.bids.splice(index, 1)
        }
      })
    } else if (delta[0] < currentOrderBook?.bids[currentOrderBook.bids.length - 1][0]) {
      currentOrderBook?.bids.push([...delta, delta[1]])
    } else if (delta[0] > currentOrderBook?.bids[0][0]) {
      currentOrderBook?.bids.unshift([...delta, delta[1]])
    } else {
      currentOrderBook?.bids.forEach((currentDelta: Delta, index: number) => {
        if (currentDelta[0] === delta[0]) {
          currentOrderBook.bids[index][1] = delta[1]
          currentOrderBook.bids[index][2] += delta[1]
        }
        if (currentDelta[0] < delta[0] && currentOrderBook.bids[index - 1][0] > delta[0]) {
          currentOrderBook.bids.splice(index, 0, [...delta, delta[1]])
        }
      })
    }
  })

  yield put({
    type: ResourcesTypes.RESOURCE_UPDATE,
    entity: Entities.ORDER_BOOK,
    payload: { asks: currentOrderBook.asks, bids: currentOrderBook.bids },
  })
}

export function* handleUpdateCancelDebouncedOrderBook(action: StandardAction): Generator {
  yield race({
    task: call(updateDebouncedOrderBook, action),
    cancel: take(ResourcesTypes.CANCEL_UPDATE),
  })
}

export function* updateDebouncedOrderBook(action: StandardAction): Generator {
  yield delay(175)

  const { payload } = action

  yield put({ type: ResourcesTypes.RESOURCE_SUCCESS, entity: Entities.DEBOUNCED_ORDER_BOOK, payload })
}

function* watchLists(): Generator {
  yield takeEvery(ResourcesTypes.FETCH_RESOURCE, fetchedResource)
  yield takeEvery(ResourcesTypes.NEW_ORDER, updateOrderBook)
  yield takeLatest(ResourcesTypes.RESOURCE_UPDATE, handleUpdateCancelDebouncedOrderBook)
}

export default watchLists
