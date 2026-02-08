'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Clock, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'

const STUDY_GROUPS = [
  {
    id: 1,
    name: 'Parasitology 101',
    description: 'General parasitology fundamentals for beginners',
    members: 24,
    maxMembers: 30,
    nextSession: '2024-02-15 7:00 PM',
    topic: 'Roundworms & Nematodes',
    status: 'active',
  },
  {
    id: 2,
    name: 'Advanced Helminthology',
    description: 'Deep dive into helminths and complex infections',
    members: 12,
    maxMembers: 15,
    nextSession: '2024-02-14 6:30 PM',
    topic: 'Tapeworm Morphology',
    status: 'active',
  },
  {
    id: 3,
    name: 'Clinical Parasitology',
    description: 'Exam prep and clinical case discussions',
    members: 18,
    maxMembers: 25,
    nextSession: '2024-02-17 8:00 PM',
    topic: 'Disease Diagnosis',
    status: 'active',
  },
  {
    id: 4,
    name: 'Protozoan Masters',
    description: 'Specialized group focusing on protozoans',
    members: 8,
    maxMembers: 12,
    nextSession: '2024-02-18 7:00 PM',
    topic: 'Malaria & Trypanosomiasis',
    status: 'upcoming',
  },
]

export default function StudyGroupsPage() {
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
            <h1 className="text-2xl font-bold text-foreground">Study Groups</h1>
            <p className="text-muted-foreground text-sm mt-1">Join or create collaborative study sessions</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Active Groups */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-foreground mb-4">Active Groups</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {STUDY_GROUPS.filter((g) => g.status === 'active').map((group) => (
                <Card
                  key={group.id}
                  className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>

                  <div className="space-y-3 mb-6 py-4 border-t border-b border-border/40">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {group.members} of {group.maxMembers} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">
                        Next session: {group.nextSession}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">Topic: {group.topic}</span>
                    </div>
                  </div>

                  <Button className="w-full">Join Group</Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Groups */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Groups</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {STUDY_GROUPS.filter((g) => g.status === 'upcoming').map((group) => (
                <Card
                  key={group.id}
                  className="p-6 border border-border/40 bg-card/40 backdrop-blur-sm opacity-75"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>

                  <div className="space-y-3 mb-6 py-4 border-t border-b border-border/40">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {group.members} of {group.maxMembers} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-muted-foreground">
                        Starts: {group.nextSession}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Notify Me
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
