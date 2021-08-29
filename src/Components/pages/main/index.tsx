import { useEffect, useState } from 'react'
import { Container, Book } from 'Components/pages/main/styled'
import Header from 'Components/molecules/header'
import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import useWebSocket from 'Utils/hooks/useWebSocket'
import { buildToggleWSMessage } from 'Utils/webSocketUtils'

const Main = (): JSX.Element => {
  const [group, setGroup] = useState<number>(1)
  const { sendMessage, isConnected } = useWebSocket('wss://www.cryptofacilities.com/ws/v1')

  useEffect(() => {
    if (isConnected) sendMessage(buildToggleWSMessage(WSMessageEvents.subscribe, ProductIds.PI_XBTUSD))
  }, [isConnected])

  return (
    <Container>
      <Book>
        <Header title='Order Book' group={group} />
      </Book>
    </Container>
  )
}

export default Main
