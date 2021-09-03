import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from 'Components/molecules/header'
import { Button } from 'Components/atoms/button'
import OrderPriceList from 'Components/organisms/ordersPriceList'
import ProductIds from 'Models/constants/productIds'
import Alignments from 'Models/constants/priceAlignments'
import spread from 'Models/constants/spread'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import { XBTUSD_GROUPS_ENUM, ETHUSD_GROUPS_ENUM } from 'Models/constants/groups'
import { debouncedOrderBookSelector } from 'Store/selectors/resourceSelectors'
import useWebSocket from 'Utils/hooks/useWebSocket'
import useDebouncedScreenWidth from 'Utils/hooks/useDebouncedScreenWidth'
import { buildToggleWSMessage } from 'Utils/webSocketUtils'
import { groupDeltasByNumber } from 'Utils/deltasUtils'
import { Container, Book, PricesContainer, ButtonsContainer } from './styled'

const BASE_URL = 'wss://www.cryptofacilities.com/ws/v1'

const Main = (): JSX.Element => {
  const [group, setGroup] = useState<XBTUSD_GROUPS_ENUM | ETHUSD_GROUPS_ENUM>(XBTUSD_GROUPS_ENUM.small)
  const [productId, setProductId] = useState<ProductIds>(ProductIds.PI_XBTUSD)
  const [wsUrl, setWsUrl] = useState<string>(BASE_URL)
  const { sendMessage, isConnected, closeWebsocket } = useWebSocket(wsUrl)
  const debouncedOrderBook = useSelector(debouncedOrderBookSelector)
  const debouncedWindowWidth = useDebouncedScreenWidth()

  useEffect(() => {
    if (isConnected) {
      sendMessage(
        buildToggleWSMessage(
          WSMessageEvents.unsubscribe,
          productId === ProductIds.PI_XBTUSD ? ProductIds.PI_ETHUSD : ProductIds.PI_XBTUSD
        )
      )
      sendMessage(buildToggleWSMessage(WSMessageEvents.subscribe, productId))
    }
  }, [isConnected, productId])

  const toggleProductId = () => {
    if (productId === ProductIds.PI_XBTUSD) {
      setGroup(ETHUSD_GROUPS_ENUM.small)
      setProductId(ProductIds.PI_ETHUSD)
    } else if (productId === ProductIds.PI_ETHUSD) {
      setGroup(XBTUSD_GROUPS_ENUM.small)
      setProductId(ProductIds.PI_XBTUSD)
    }
  }

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

  const closeConnection = () => {
    closeWebsocket()
    setWsUrl('')
  }

  const openConnection = () => {
    setWsUrl(BASE_URL)
  }

  return (
    <Container>
      <Book>
        <Header title='Order Book' group={group} setGroup={setGroup} productId={productId} />
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
        <ButtonsContainer>
          <Button onClick={toggleProductId} disabled={!isConnected}>
            Toggle feed
          </Button>
          <Button bgColor={isConnected ? 'red' : 'green'} onClick={isConnected ? closeConnection : openConnection}>
            {isConnected ? 'Kill feed' : 'Start feed'}
          </Button>
        </ButtonsContainer>
      </Book>
    </Container>
  )
}

export default Main
