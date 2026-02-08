'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, MessageCircle, Heart, Reply } from 'lucide-react'
import Link from 'next/link'

const FORUM_POSTS = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: 'SC',
    title: 'Best strategies for remembering parasite lifecycles?',
    excerpt: 'I struggle with keeping track of all the different stages. What study methods work best?',
    replies: 12,
    likes: 24,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'James Mitchell',
    avatar: 'JM',
    title: 'Anyone taking the parasitology exam next month?',
    excerpt: 'Looking for study buddies. Should we form a group?',
    replies: 8,
    likes: 15,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    author: 'Dr. Lisa Park',
    avatar: 'LP',
    title: 'New research on hookworm immunity',
    excerpt: 'Sharing some interesting findings from recent literature...',
    replies: 24,
    likes: 42,
    timestamp: '1 day ago',
  },
]

export default function ForumsPage() {
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
            <h1 className="text-2xl font-bold text-foreground">Community Forums</h1>
            <p className="text-muted-foreground text-sm mt-1">Discuss and share with fellow students</p>
          </div>
        </div>
        <Button>New Discussion</Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Posts */}
          <div className="space-y-4">
            {FORUM_POSTS.map((post) => (
              <Card
                key={post.id}
                className="p-6 border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition cursor-pointer"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                      {post.avatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="font-semibold text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition">
                        <Reply className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Discussions</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
