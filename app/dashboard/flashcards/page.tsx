'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'
import Link from 'next/link'

const FLASHCARDS = [
  {
    id: 1,
    question: 'What is the primary habitat of Ascaris lumbricoides?',
    answer: 'The small intestine of humans, particularly the jejunum and ileum.',
  },
  {
    id: 2,
    question: 'How many body segments do tapeworms typically have?',
    answer: 'Hundreds to thousands of segments called proglottids, arranged in a chain.',
  },
  {
    id: 3,
    question: 'What is the defining characteristic of hookworm attachment?',
    answer: 'A buccal capsule with cutting plates or teeth for feeding on intestinal mucosa and blood.',
  },
  {
    id: 4,
    question: 'What is the primary transmission route for roundworms?',
    answer: 'Fecal-oral route through contaminated food, water, or soil.',
  },
  {
    id: 5,
    question: 'How long can Taenia solium (pork tapeworm) grow?',
    answer: 'Up to 10 meters (33 feet) in length.',
  },
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState<number[]>([])

  const current = FLASHCARDS[currentIndex]
  const progress = Math.round(((currentIndex + 1) / FLASHCARDS.length) * 100)

  const handleNext = () => {
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const toggleComplete = () => {
    if (completed.includes(current.id)) {
      setCompleted(completed.filter((id) => id !== current.id))
    } else {
      setCompleted([...completed, current.id])
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setCompleted([])
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
            <p className="text-muted-foreground text-sm mt-1">Study parasite biology concepts</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Card {currentIndex + 1} of {FLASHCARDS.length}
              </span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <Card
            className="p-12 bg-gradient-to-br from-card to-card/50 border border-border/40 cursor-pointer aspect-video flex flex-col items-center justify-center relative overflow-hidden transition-transform transform"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />

            <div className="relative z-10 text-center">
              <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-wide">
                {isFlipped ? 'Answer' : 'Question'}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-foreground text-pretty leading-relaxed">
                {isFlipped ? current.answer : current.question}
              </p>
              <p className="text-xs text-muted-foreground mt-8">Click to flip</p>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mt-8">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="outline"
              size="lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onClick={toggleComplete}
              variant={completed.includes(current.id) ? 'default' : 'outline'}
              className="flex-1"
            >
              {completed.includes(current.id) ? '✓ Learned' : 'Mark as Learned'}
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentIndex === FLASHCARDS.length - 1}
              variant="outline"
              size="lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            onClick={handleReset}
            variant="ghost"
            className="w-full mt-4"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Reset Deck
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card className="p-4 border border-border/40 bg-card/50">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-primary">{completed.length}</p>
            </Card>
            <Card className="p-4 border border-border/40 bg-card/50">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-secondary">{FLASHCARDS.length - completed.length}</p>
            </Card>
            <Card className="p-4 border border-border/40 bg-card/50">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold text-accent">
                {FLASHCARDS.length > 0
                  ? Math.round((completed.length / FLASHCARDS.length) * 100)
                  : 0}
                %
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
