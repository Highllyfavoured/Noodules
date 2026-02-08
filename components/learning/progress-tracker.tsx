'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Trophy, Zap, BookOpen, Target } from 'lucide-react'

interface ModuleProgress {
  id: string
  name: string
  category: string
  progress: number
  completed: number
  total: number
  lastAccessed: string
}

interface ProgressTrackerProps {
  modules: ModuleProgress[]
}

export function ProgressTracker({ modules }: ProgressTrackerProps) {
  const totalProgress = Math.round(
    modules.reduce((sum, m) => sum + m.progress, 0) / modules.length
  )

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 border border-border/40 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
            <p className="text-sm text-muted-foreground">Across all modules</p>
          </div>
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <div className="flex items-baseline gap-4">
          <div className="text-4xl font-bold text-primary">{totalProgress}%</div>
          <Progress value={totalProgress} className="flex-1 h-3" />
        </div>
      </Card>

      {/* Module Progress */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Module Progress</h3>
        {modules.map((module) => (
          <Card key={module.id} className="p-4 border border-border/40 bg-card/50">
            <div className="mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground text-sm">{module.name}</p>
                  <p className="text-xs text-muted-foreground">{module.category}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{module.progress}%</span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">
              {module.completed} of {module.total} items completed • Last accessed {module.lastAccessed}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function LearningStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 border border-border/40 bg-card/50">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-5 h-5 text-secondary" />
          <p className="text-xs text-muted-foreground">Daily Streak</p>
        </div>
        <p className="text-2xl font-bold text-secondary">24 days</p>
      </Card>

      <Card className="p-4 border border-border/40 bg-card/50">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <p className="text-xs text-muted-foreground">Modules Completed</p>
        </div>
        <p className="text-2xl font-bold text-accent">12/18</p>
      </Card>

      <Card className="p-4 border border-border/40 bg-card/50">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-primary" />
          <p className="text-xs text-muted-foreground">Quiz Average</p>
        </div>
        <p className="text-2xl font-bold text-primary">87%</p>
      </Card>

      <Card className="p-4 border border-border/40 bg-card/50">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <p className="text-xs text-muted-foreground">Achievements</p>
        </div>
        <p className="text-2xl font-bold text-amber-500">8/15</p>
      </Card>
    </div>
  )
}
