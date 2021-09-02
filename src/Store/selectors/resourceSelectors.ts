import { createSelector } from 'reselect'
import { ResourcesState, ResourceStateFields } from 'Store/reducers/resources/resourceReducer'
import { State } from 'Store/state'
import OrderBook from 'Models/OrderBook'
import { resourceEntity } from 'Models/resourceEntities'

const resourcesSelector = (state: State): ResourcesState => state.resources

function individualResourceSelector<T extends resourceEntity>(resourcePage: ResourceStateFields) {
  return createSelector(resourcesSelector, resources => resources[resourcePage] as T)
}

export const orderBookSelector = individualResourceSelector<OrderBook>(ResourceStateFields.ORDER_BOOK)

export const debouncedOrderBookSelector = individualResourceSelector<OrderBook>(
  ResourceStateFields.DEBOUNCED_ORDER_BOOK
)
