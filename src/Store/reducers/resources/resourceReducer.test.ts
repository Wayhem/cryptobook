import { resourcesReducer, initialState, ResourceStateFields } from 'Store/reducers/resources/resourceReducer'
import { ResourcesAction, successResource, resetResource } from 'Store/actions/resourceActions'
import { orderBookMock } from 'Utils/mocks/orderBook'
import Entities from 'Models/Entities'

describe('Testing resource reducer', () => {
  test('should return the initial state when no action type is defined', () => {
    expect(resourcesReducer(undefined, {} as ResourcesAction)).toEqual(initialState)
  })

  test('should handle fetching resource data on success', () => {
    expect(resourcesReducer(initialState, successResource(Entities.ORDER_BOOK, orderBookMock))).toEqual({
      ...initialState,
      [ResourceStateFields.ORDER_BOOK]: orderBookMock,
    })
  })

  test('should handle reset resource properly', () => {
    expect(
      resourcesReducer(
        {
          ...initialState,
          [ResourceStateFields.ORDER_BOOK]: orderBookMock,
        },
        resetResource(Entities.ORDER_BOOK)
      )
    ).toEqual({
      ...initialState,
      [ResourceStateFields.ORDER_BOOK]: initialState[ResourceStateFields.ORDER_BOOK],
    })
  })
})
