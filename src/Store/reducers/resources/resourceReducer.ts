import Entities from 'Models/Entities'
import OrderBook, { orderBookBuilder } from 'Models/OrderBook'
import { ResourcesAction } from 'Store/actions/resourceActions'
import ResourceTypes from 'Store/types/resourceTypes'

export enum ResourceStateFields {
  ORDER_BOOK = 'orderBook',
  DEBOUNCED_ORDER_BOOK = 'debouncedOrderBook',
}

export interface ResourcesState {
  [ResourceStateFields.ORDER_BOOK]: OrderBook
  [ResourceStateFields.DEBOUNCED_ORDER_BOOK]: OrderBook
}

export const initialState: ResourcesState = {
  [ResourceStateFields.ORDER_BOOK]: orderBookBuilder(),
  [ResourceStateFields.DEBOUNCED_ORDER_BOOK]: orderBookBuilder(),
}

export const stateMapping: { [index: string]: ResourceStateFields } = {
  [Entities.ORDER_BOOK]: ResourceStateFields.ORDER_BOOK,
  [Entities.DEBOUNCED_ORDER_BOOK]: ResourceStateFields.DEBOUNCED_ORDER_BOOK,
}

export function resourcesReducer(state: ResourcesState = initialState, action: ResourcesAction): ResourcesState {
  switch (action.type) {
    case ResourceTypes.RESOURCE_SUCCESS:
    case ResourceTypes.RESET_RESOURCE:
    case ResourceTypes.RESOURCE_UPDATE:
      return {
        ...state,
        [stateMapping[action.entity]]: action.payload,
      }
    default:
      return state
  }
}
