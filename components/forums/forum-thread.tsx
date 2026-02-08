'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
}

interface ForumThreadProps {
  threadId: number
  title: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: number
  comments: Comment[]
}

export function ForumThread({
  title,
  author,
  avatar,
  content,
  timestamp,
  likes,
  replies,
  comments,
}: ForumThreadProps) {
  const [newComment, setNewComment] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const handlePostComment = () => {
    if (newComment.trim()) {
      console.log('[v0] Posting comment:', newComment)
      setNewComment('')
      setIsReplying(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Original Post */}
      <Card className="p-8 border border-border/40 bg-card/50">
        <div className="flex gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold flex-shrink-0">
            {avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <p className="font-semibold text-foreground">{author}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
            <p className="text-foreground leading-relaxed mb-6">{content}</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{likes} likes</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{replies} replies</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Comments */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground text-lg">Replies ({comments.length})</h3>
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6 border border-border/40 bg-card/40">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="font-semibold text-foreground text-sm">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition">
                    <Heart className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-primary transition">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Reply Box */}
      <Card className="p-6 border border-border/40 bg-card/50">
        <h3 className="font-semibold text-foreground mb-4">Share Your Thoughts</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Write a thoughtful reply..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-32"
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsReplying(false)}>
              Cancel
            </Button>
            <Button onClick={handlePostComment} disabled={!newComment.trim()}>
              Post Reply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
