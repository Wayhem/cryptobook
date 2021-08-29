import { useRef, useEffect, useState } from 'react'
import WSMessage from 'Models/WSMessage'

function useWebSocket(url: string) {
  const ws = useRef<null | WebSocket>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)

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
      const message = JSON.parse(e.data)
      console.log('e', message)
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
