import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import FeedTypes from './constants/feedTypes'

interface WSMessage {
  event: WSMessageEvents
  feed: FeedTypes
  product_ids: ProductIds[]
}

export default WSMessage
