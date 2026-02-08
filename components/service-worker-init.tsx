'use client'

import { useEffect } from 'react'

export function ServiceWorkerInit() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('[v0] Service Worker registered:', registration)
          })
          .catch((error) => {
            console.log('[v0] Service Worker registration failed:', error)
          })
      })
    }
  }, [])

  return null
}
