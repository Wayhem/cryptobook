import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import WSMessage from 'Models/WSMessage'
import FeedTypes from 'Models/constants/feedTypes'
import Entities from 'Models/Entities'
import { fetchedResource, updateOrderBook } from 'Store/actions/resourceActions'
import ResourceTypes from 'Store/types/resourceTypes'

function useWebSocket(url: string) {
  const ws = useRef<null | WebSocket>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    ws.current = new WebSocket(url)
    ws.current.onopen = () => setIsConnected(true)
    ws.current.onclose = () => setIsConnected(false)

    return () => {
      if (ws.current) ws.current.close()
    }
  }, [])

  useEffect(() => {
    if (!ws.current) return

    ws.current.onmessage = e => {
      const { feed, asks, bids } = JSON.parse(e.data)

      if (feed === FeedTypes.Book_snapshot) {
        dispatch(fetchedResource(Entities.ORDER_BOOK, { asks, bids }))
        dispatch(fetchedResource(Entities.DEBOUNCED_ORDER_BOOK, { asks, bids }))
        dispatch({ type: ResourceTypes.CANCEL_UPDATE })
      } else if (feed === FeedTypes.standard && asks && bids)
        dispatch(updateOrderBook(Entities.ORDER_BOOK, { asks, bids }))
    }
  }, [])

  const sendMessage = (msg: WSMessage) => {
    if (ws.current?.readyState !== WebSocket.OPEN) return
    const message = JSON.stringify(msg)
    ws.current?.send(message)
  }

  return { sendMessage, isConnected }
}

export default useWebSocket
