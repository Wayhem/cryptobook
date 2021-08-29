import WSMessage from 'Models/WSMessage'
import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'

const buildToggleWSMessage = (event: WSMessageEvents, productId: ProductIds): WSMessage => ({
  event,
  feed: 'book_ui_1',
  product_ids: [productId],
})

export { buildToggleWSMessage }
