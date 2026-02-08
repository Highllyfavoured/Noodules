'use client'

import { Suspense, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ParasiteViewer } from '@/components/viewer/parasite-viewer'
import { ParasiteInfo } from '@/components/viewer/parasite-info'
import { ParasiteList } from '@/components/viewer/parasite-list'
import { ChevronLeft, Info, RotateCcw, ZoomIn, ZoomOut, Loader2 } from 'lucide-react'
import Link from 'next/link'

const PARASITES = [
  {
    id: 'roundworm',
    name: 'Roundworm (Ascaris)',
    description: 'Large intestinal parasite with characteristic cylindrical body shape.',
    category: 'Nematodes',
    features: ['Cylindrical body', 'Complete digestive system', 'Separate sexes'],
  },
  {
    id: 'tapeworm',
    name: 'Tapeworm (Taenia)',
    description: 'Segmented parasite adapted for intestinal residence.',
    category: 'Cestodes',
    features: ['Segmented body', 'Scolex (head)', 'Proglottids'],
  },
  {
    id: 'hookworm',
    name: 'Hookworm',
    description: 'Small blood-feeding parasite with characteristic buccal cavity.',
    category: 'Nematodes',
    features: ['Small size', 'Buccal capsule', 'Anticoagulant secretion'],
  },
]

export default function ViewerPage() {
  const [selectedParasite, setSelectedParasite] = useState(PARASITES[0])
  const [showInfo, setShowInfo] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Critical fix: Ensure component is mounted before rendering 3D elements
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">3D Parasite Viewer</h1>
            <p className="text-muted-foreground text-xs">Interactive 3D model exploration</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Viewer Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 bg-gradient-to-br from-background to-muted relative overflow-hidden">
            {/* Only render ParasiteViewer on the client. 
                This prevents the "Hydration Mismatch" error. 
            */}
            {mounted ? (
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-muted-foreground animate-pulse">Initializing 3D Environment...</p>
                </div>
              }>
                <ParasiteViewer parasiteId={selectedParasite.id} />
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Preparing workspace...</p>
              </div>
            )}

            {/* View Controls Overlay */}
            <div className="absolute bottom-6 left-6 flex gap-2 bg-background/60 backdrop-blur-md p-2 rounded-xl border border-border/40 shadow-xl">
              <Button size="icon" variant="ghost" className="h-9 w-9" title="Reset View">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <div className="w-px h-8 bg-border/40 mx-1" />
              <Button size="icon" variant="ghost" className="h-9 w-9" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Toggle Info Mobile/Desktop Overlay */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-6 right-6 shadow-lg border border-primary/20"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-4 h-4 mr-2" />
              {showInfo ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside 
          className={`transition-all duration-300 ease-in-out border-l border-border/40 bg-card/30 backdrop-blur-md flex flex-col overflow-hidden ${
            showInfo ? 'w-80' : 'w-0'
          }`}
        >
          <div className="w-80 h-full flex flex-col">
            {/* Selected Parasite Info */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 py-6 border-b border-border/40 flex-1 overflow-y-auto custom-scrollbar">
                <ParasiteInfo parasite={selectedParasite} />
              </div>
            </div>

            {/* Selector List */}
            <div className="p-4 bg-muted/20">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 px-2">
                Classification Library
              </h3>
              <div className="max-h-[300px] overflow-y-auto">
                <ParasiteList
                  parasites={PARASITES}
                  selected={selectedParasite}
                  onSelect={setSelectedParasite}
                />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}