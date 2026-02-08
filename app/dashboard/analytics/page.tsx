'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressTracker, LearningStats } from '@/components/learning/progress-tracker'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'

const LEARNING_DATA = [
  { date: 'Mon', hours: 2, quizzes: 1, flashcards: 15 },
  { date: 'Tue', hours: 3, quizzes: 2, flashcards: 20 },
  { date: 'Wed', hours: 1.5, quizzes: 0, flashcards: 10 },
  { date: 'Thu', hours: 4, quizzes: 3, flashcards: 25 },
  { date: 'Fri', hours: 2.5, quizzes: 1, flashcards: 18 },
  { date: 'Sat', hours: 3, quizzes: 2, flashcards: 22 },
  { date: 'Sun', hours: 2, quizzes: 1, flashcards: 12 },
]

const QUIZ_SCORES = [
  { quiz: 'Roundworms', score: 85 },
  { quiz: 'Tapeworms', score: 78 },
  { quiz: 'Hookworms', score: 92 },
  { quiz: 'Protozoa', score: 88 },
  { quiz: 'Mixed Review', score: 81 },
]

const MODULE_PROGRESS = [
  {
    id: 'roundworms',
    name: 'Roundworms (Nematodes)',
    category: 'Helminthic',
    progress: 100,
    completed: 15,
    total: 15,
    lastAccessed: '2 hours ago',
  },
  {
    id: 'tapeworms',
    name: 'Tapeworms (Cestodes)',
    category: 'Helminthic',
    progress: 75,
    completed: 12,
    total: 16,
    lastAccessed: '1 day ago',
  },
  {
    id: 'hookworms',
    name: 'Hookworms',
    category: 'Helminthic',
    progress: 60,
    completed: 9,
    total: 15,
    lastAccessed: '3 days ago',
  },
  {
    id: 'protozoa',
    name: 'Protozoans',
    category: 'Protozoic',
    progress: 45,
    completed: 7,
    total: 16,
    lastAccessed: '1 week ago',
  },
]

export default function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Learning Analytics</h1>
              <p className="text-muted-foreground text-sm mt-1">Track your progress and insights</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          {/* Quick Stats */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Stats</h2>
            <LearningStats />
          </div>

          {/* Learning Activity Chart */}
          <Card className="p-6 border border-border/40 bg-card/50">
            <h3 className="font-semibold text-foreground mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={LEARNING_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="quizzes" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Quiz Scores */}
          <Card className="p-6 border border-border/40 bg-card/50">
            <h3 className="font-semibold text-foreground mb-4">Quiz Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={QUIZ_SCORES}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="quiz" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Module Progress */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Module Progress</h2>
            <ProgressTracker modules={MODULE_PROGRESS} />
          </div>
        </div>
      </div>
    </div>
  )
}
