'use client';

import { useEffect, useState } from 'react'

interface OfflineData {
  key: string
  value: unknown
  timestamp: number
}

export function useOfflineStorage(key: string, initialValue?: unknown) {
  const [storedValue, setStoredValue] = useState<unknown>(initialValue)
  const [isOnline, setIsOnline] = useState(true)
  const [isSynced, setIsSynced] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const data: OfflineData = JSON.parse(item)
        setStoredValue(data.value)
      }
    } catch (error) {
      console.error('[v0] Failed to load from offline storage:', error)
    }
  }, [key])

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      console.log('[v0] Back online')
    }

    const handleOffline = () => {
      setIsOnline(false)
      console.log('[v0] Gone offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const setValue = (value: unknown) => {
    try {
      setStoredValue(value)
      setIsSynced(false)

      const data: OfflineData = {
        key,
        value,
        timestamp: Date.now(),
      }

      window.localStorage.setItem(key, JSON.stringify(data))

      // Attempt sync when online
      if (isOnline) {
        syncToServer(key, value)
      }
    } catch (error) {
      console.error('[v0] Failed to store value:', error)
    }
  }

  const syncToServer = async (storageKey: string, value: unknown) => {
    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: storageKey, value }),
      })

      if (response.ok) {
        setIsSynced(true)
        console.log('[v0] Synced to server:', storageKey)
      }
    } catch (error) {
      console.error('[v0] Sync failed:', error)
    }
  }

  const clearStorage = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('[v0] Failed to clear storage:', error)
    }
  }

  return {
    value: storedValue,
    setValue,
    isOnline,
    isSynced,
    clearStorage,
  }
}
