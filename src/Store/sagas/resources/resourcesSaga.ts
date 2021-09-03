import { takeEvery, put, select, takeLatest, delay, race, take, call } from 'redux-saga/effects'
import { StandardAction } from 'Store/actions/resourceActions'
import ResourcesTypes from 'Store/types/resourceTypes'
import { orderBookSelector } from 'Store/selectors/resourceSelectors'
import { unformatters as resourceUnformatters } from 'Utils/formatters/resourceUnformatters'
import { getUpdatedDeltas } from 'Utils/deltasUtils'
import Entities from 'Models/Entities'
import Delta from 'Models/Delta'

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

  let newAsks = [] as Delta[]
  let newBids = [] as Delta[]

  if (currentOrderBook) {
    newAsks = getUpdatedDeltas(asks, currentOrderBook, true)
    newBids = getUpdatedDeltas(bids, currentOrderBook, false)
  }

  yield put({
    type: ResourcesTypes.RESOURCE_UPDATE,
    entity: Entities.ORDER_BOOK,
    payload: { asks: newAsks, bids: newBids },
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
