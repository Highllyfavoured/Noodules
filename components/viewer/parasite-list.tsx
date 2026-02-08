'use client';

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface Parasite {
  id: string
  name: string
  description: string
  category: string
  features: string[]
}

interface ParasiteListProps {
  parasites: Parasite[]
  selected: Parasite
  onSelect: (parasite: Parasite) => void
}

export function ParasiteList({ parasites, selected, onSelect }: ParasiteListProps) {
  return (
    <div className="space-y-2">
      {parasites.map((parasite) => (
        <Card
          key={parasite.id}
          className={`p-3 border cursor-pointer transition ${
            selected.id === parasite.id
              ? 'bg-primary/10 border-primary'
              : 'bg-card/40 border-border/40 hover:bg-card/60'
          }`}
          onClick={() => onSelect(parasite)}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-semibold text-sm text-foreground">{parasite.name}</h4>
              <p className="text-xs text-muted-foreground">{parasite.category}</p>
            </div>
            {selected.id === parasite.id && (
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
