import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from 'Components/molecules/header'
import OrderPriceList from 'Components/organisms/ordersPriceList'
import ProductIds from 'Models/constants/productIds'
import Alignments from 'Models/constants/priceAlignments'
import spread from 'Models/constants/spread'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import { XBTUSD_GROUPS_ENUM } from 'Models/constants/groups'
import { debouncedOrderBookSelector } from 'Store/selectors/resourceSelectors'
import useWebSocket from 'Utils/hooks/useWebSocket'
import useDebouncedScreenWidth from 'Utils/hooks/useDebouncedScreenWidth'
import { buildToggleWSMessage } from 'Utils/webSocketUtils'
import { groupDeltasByNumber } from 'Utils/webSocketUtils'
import { Container, Book, PricesContainer } from './styled'

const Main = (): JSX.Element => {
  const [group, setGroup] = useState<XBTUSD_GROUPS_ENUM>(XBTUSD_GROUPS_ENUM.large)
  const { sendMessage, isConnected } = useWebSocket('wss://www.cryptofacilities.com/ws/v1')
  const debouncedOrderBook = useSelector(debouncedOrderBookSelector)
  const debouncedWindowWidth = useDebouncedScreenWidth()

  useEffect(() => {
    if (isConnected) sendMessage(buildToggleWSMessage(WSMessageEvents.subscribe, ProductIds.PI_XBTUSD))
  }, [isConnected])

  const newAsks = groupDeltasByNumber(group, debouncedOrderBook.bids)
  const newBids = groupDeltasByNumber(group, debouncedOrderBook.asks)

  const bidsToDisplay = newAsks.slice(0, spread)
  const asksToDisplay = newBids.slice(0, spread)

  let biggestNumber = 0

  bidsToDisplay.forEach(delta => {
    if (delta[2] > biggestNumber) biggestNumber = delta[2]
  })

  asksToDisplay.forEach(delta => {
    if (delta[2] > biggestNumber) biggestNumber = delta[2]
  })

  return (
    <Container>
      <Book>
        <Header title='Order Book' group={group} setGroup={setGroup} />
        <PricesContainer>
          <OrderPriceList
            elements={bidsToDisplay}
            alignment={debouncedWindowWidth > 768 ? Alignments.right : Alignments.left}
            biggestNumber={biggestNumber}
            color='green'
            colorBg='lightGreen'
          />
          <OrderPriceList
            elements={asksToDisplay}
            alignment={Alignments.left}
            biggestNumber={biggestNumber}
            color='red'
            colorBg='lightRed'
          />
        </PricesContainer>
      </Book>
    </Container>
  )
}

export default Main
