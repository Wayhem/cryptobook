import WSMessage from 'Models/WSMessage'
import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import FeedTypes from 'Models/constants/feedTypes'

const buildToggleWSMessage = (event: WSMessageEvents, productId: ProductIds): WSMessage => ({
  event,
  feed: FeedTypes.standard,
  product_ids: [productId],
})

export { buildToggleWSMessage }
