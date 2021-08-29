import { useEffect } from 'react'
import ProductIds from 'Models/constants/productIds'
import WSMessageEvents from 'Models/constants/webSocketMessageEvents'
import useWebSocket from 'Utils/hooks/useWebSocket'
import { buildToggleWSMessage } from 'Utils/webSocketUtils'

const Main = (): JSX.Element => {
  const { sendMessage, isConnected } = useWebSocket('wss://www.cryptofacilities.com/ws/v1')

  useEffect(() => {
    if (isConnected) sendMessage(buildToggleWSMessage(WSMessageEvents.subscribe, ProductIds.PI_XBTUSD))
  }, [isConnected])

  return <div>hello</div>
}

export default Main
