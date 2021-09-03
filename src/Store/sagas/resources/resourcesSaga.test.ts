import { delay, put, select } from 'redux-saga/effects'
import { fetchedResource, updateOrderBook, updateDebouncedOrderBook } from 'Store/sagas/resources/resourcesSaga'
import Entities from 'Models/Entities'
import { orderBookMockNoTotals } from 'Utils/mocks/orderBook'
import { messageMock } from 'Utils/mocks/updateMessageMock'
import ResourceTypes from 'Store/types/resourceTypes'
import { unformatters } from 'Utils/formatters/resourceUnformatters'
import { orderBookSelector } from 'Store/selectors/resourceSelectors'
import { updatedOrderBook } from 'Utils/mocks/updatedOrderBockMock'

describe('lists sagas', () => {
  test('fetchedResource', () => {
    const gen = fetchedResource({
      type: ResourceTypes.FETCH_RESOURCE,
      entity: Entities.ORDER_BOOK,
      payload: orderBookMockNoTotals,
    })
    const unformatter = unformatters.get(Entities.ORDER_BOOK)
    let expectedResult
    if (unformatter) expectedResult = unformatter(orderBookMockNoTotals)
    expect(gen.next()).toEqual({
      done: false,
      value: put({ type: ResourceTypes.RESOURCE_SUCCESS, entity: Entities.ORDER_BOOK, payload: expectedResult }),
    })
    expect(gen.next()).toEqual({ done: true, value: undefined })
  })

  test('updateOrderBook', () => {
    const gen = updateOrderBook({
      type: ResourceTypes.FETCH_RESOURCE,
      entity: Entities.ORDER_BOOK,
      payload: messageMock,
    })
    expect(gen.next()).toEqual({ done: false, value: select(orderBookSelector) })
    expect(gen.next()).toEqual({
      done: false,
      value: put({ type: ResourceTypes.RESOURCE_UPDATE, entity: Entities.ORDER_BOOK, payload: { asks: [], bids: [] } }),
    })
    expect(gen.next()).toEqual({ done: true, value: undefined })
  })

  test('updateDebouncedOrderBook', () => {
    const gen = updateDebouncedOrderBook({
      type: ResourceTypes.RESOURCE_UPDATE,
      entity: Entities.ORDER_BOOK,
      payload: updatedOrderBook,
    })
    expect(gen.next()).toEqual({ done: false, value: delay(175) })
    expect(gen.next()).toEqual({
      done: false,
      value: put({
        type: ResourceTypes.RESOURCE_SUCCESS,
        entity: Entities.DEBOUNCED_ORDER_BOOK,
        payload: updatedOrderBook,
      }),
    })
    expect(gen.next()).toEqual({ done: true, value: undefined })
  })
})
