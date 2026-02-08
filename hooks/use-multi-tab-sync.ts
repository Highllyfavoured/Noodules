'use client';

import { useEffect, useState, useCallback } from 'react'

interface BroadcastMessage {
  type: string
  payload: unknown
}

export function useMultiTabSync(channelName: string) {
  const [isSupported, setIsSupported] = useState(false)
  const [broadcastChannel, setBroadcastChannel] = useState<BroadcastChannel | null>(null)

  // Initialize broadcast channel
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      setIsSupported(true)
      const channel = new BroadcastChannel(channelName)
      setBroadcastChannel(channel)

      return () => {
        channel.close()
      }
    }
  }, [channelName])

  const broadcast = useCallback(
    (message: BroadcastMessage) => {
      if (broadcastChannel) {
        broadcastChannel.postMessage(message)
        console.log('[v0] Broadcast message:', message)
      }
    },
    [broadcastChannel]
  )

  const onMessage = useCallback(
    (callback: (message: BroadcastMessage) => void) => {
      if (broadcastChannel) {
        const handler = (event: MessageEvent) => {
          callback(event.data)
        }
        broadcastChannel.addEventListener('message', handler)

        return () => {
          broadcastChannel.removeEventListener('message', handler)
        }
      }
    },
    [broadcastChannel]
  )

  return {
    isSupported,
    broadcast,
    onMessage,
  }
}
