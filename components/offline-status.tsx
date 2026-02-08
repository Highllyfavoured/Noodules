'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      console.log('[v0] Connected to internet')
    }

    const handleOffline = () => {
      setIsOnline(false)
      console.log('[v0] Disconnected from internet')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) {
    return null
  }

  return (
    <Alert className="fixed bottom-4 left-4 right-4 md:right-auto md:w-96 bg-amber-500/10 border-amber-500/30">
      <div className="flex items-center gap-3">
        <WifiOff className="w-4 h-4 text-amber-600" />
        <AlertDescription className="text-amber-900">
          You're offline. Changes will sync when you're back online.
        </AlertDescription>
      </div>
    </Alert>
  )
}
