'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Microscope, BookOpen, MessageSquare, TrendingUp, Flame, Star, Award } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-background via-background to-muted/50">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-40">
        <div className="px-8 py-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Welcome Back, Scholar
              </h1>
              <p className="text-muted-foreground mt-2">Continue mastering parasitology with Noodules</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Learning Streak</p>
              <div className="flex items-center gap-2 mt-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold text-foreground">24 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 3D Models Card */}
            <Card className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="relative w-10 h-10 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-background rounded-lg p-2 flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">3D Models</h3>
                <p className="text-sm text-muted-foreground mb-4">Explore interactive parasites</p>
                <Link href="/dashboard/viewer">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Flashcards Card */}
            <Card className="group relative p-6 border border-border bg-background hover:border-secondary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="relative w-10 h-10 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-background rounded-lg p-2 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">Review and memorize</p>
                <Link href="/dashboard/flashcards">
                  <Button size="sm" className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white border-0">
                    Study Now
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quizzes Card */}
            <Card className="group relative p-6 border border-border bg-background hover:border-accent/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="relative w-10 h-10 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-background rounded-lg p-2 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quizzes</h3>
                <p className="text-sm text-muted-foreground mb-4">Test your knowledge</p>
                <Link href="/dashboard/quizzes">
                  <Button size="sm" className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white border-0">
                    Take Quiz
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Forums Card */}
            <Card className="group relative p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="relative w-10 h-10 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-background rounded-lg p-2 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">Join discussions</p>
                <Link href="/dashboard/forums">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0">
                    Visit Forums
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Learning Analytics */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Card */}
          <Card className="lg:col-span-2 p-8 border border-border bg-background">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Learning Progress</h2>
              <Star className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-6">
              {[
                { title: 'Roundworms Lifecycle', progress: 75, modules: '6/8' },
                { title: 'Tapeworm Anatomy', progress: 50, modules: '3/6' },
                { title: 'Protozoan Classification', progress: 25, modules: '2/8' },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className="text-sm text-muted-foreground">{item.modules}</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{item.progress}% complete</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-8 border border-border bg-background">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Your Achievements</h2>
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">12</p>
                <p className="text-sm text-muted-foreground mt-2">Modules Completed</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
                <p className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">87%</p>
                <p className="text-sm text-muted-foreground mt-2">Average Quiz Score</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                <p className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">24</p>
                <p className="text-sm text-muted-foreground mt-2">Learning Streak (Days)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
