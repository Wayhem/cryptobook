import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'

interface WSMessage {
  event: WSMessageEvents
  feed: string
  product_ids: ProductIds[]
}

export default WSMessage
