import { useEffect, useState } from 'react'
import Header from 'Components/molecules/header'
import OrderPriceList from 'Components/organisms/ordersPriceList'
import ProductIds from 'Models/constants/productIds'
import Alignments from 'Models/constants/priceAlignments'
import spread from 'Models/constants/spread'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import useWebSocket from 'Utils/hooks/useWebSocket'
import { buildToggleWSMessage } from 'Utils/webSocketUtils'
import { orderBookMock } from 'Utils/mocks/orderBook'
import { Container, Book, PricesContainer } from './styled'

const Main = (): JSX.Element => {
  const [group, setGroup] = useState<number>(1)
  const { sendMessage, isConnected } = useWebSocket('wss://www.cryptofacilities.com/ws/v1')

  useEffect(() => {
    if (isConnected) sendMessage(buildToggleWSMessage(WSMessageEvents.subscribe, ProductIds.PI_XBTUSD))
  }, [isConnected])

  const bidsToDisplay = orderBookMock.bids.slice(0, spread)
  const asksToDisplay = orderBookMock.asks.slice(0, spread)

  let biggestNumber = orderBookMock.bids[0][2]

  bidsToDisplay.forEach(delta => {
    if (delta[2] > biggestNumber) biggestNumber = delta[2]
  })

  asksToDisplay.forEach(delta => {
    if (delta[2] > biggestNumber) biggestNumber = delta[2]
  })

  return (
    <Container>
      <Book>
        <Header title='Order Book' group={group} />
        <PricesContainer>
          <OrderPriceList elements={bidsToDisplay} alignment={Alignments.right} biggestNumber={biggestNumber} />
          <OrderPriceList elements={asksToDisplay} alignment={Alignments.left} biggestNumber={biggestNumber} />
        </PricesContainer>
      </Book>
    </Container>
  )
}

export default Main
