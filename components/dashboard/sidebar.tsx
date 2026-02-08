'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Microscope,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Settings,
  LogOut,
  LayoutGrid,
  BarChart3,
  Users,
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { label: '3D Viewer', href: '/dashboard/viewer', icon: Microscope },
    { label: 'Flashcards', href: '/dashboard/flashcards', icon: BookOpen },
    { label: 'Quizzes', href: '/dashboard/quizzes', icon: TrendingUp },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Study Groups', href: '/dashboard/study-groups', icon: Users },
    { label: 'Forums', href: '/dashboard/forums', icon: MessageSquare },
  ]

  return (
    <aside className="w-64 border-r border-border/40 bg-card/30 backdrop-blur-sm flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Microscope className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Noodules</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/40 px-4 py-4 space-y-2">
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start text-destructive" size="sm">
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
