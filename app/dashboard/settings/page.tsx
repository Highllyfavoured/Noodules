'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/40 backdrop-blur-sm px-8 py-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-8 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Profile</h2>
          <Card className="p-6 border border-border/40 bg-card/50 space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                defaultValue="John Doe"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                defaultValue="john@example.com"
                className="mt-2"
              />
            </div>
            <Button>Save Profile</Button>
          </Card>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Preferences</h2>
          <Card className="p-6 border border-border/40 bg-card/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates about new content</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="border-t border-border/40 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Enable dark theme</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="border-t border-border/40 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Study Reminders</p>
                <p className="text-sm text-muted-foreground">Get daily study suggestions</p>
              </div>
              <Switch />
            </div>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Privacy & Security</h2>
          <Card className="p-6 border border-border/40 bg-card/50 space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              View Active Sessions
            </Button>
          </Card>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Danger Zone</h2>
          <Card className="p-6 border border-destructive/30 bg-destructive/5">
            <p className="text-muted-foreground mb-4">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
