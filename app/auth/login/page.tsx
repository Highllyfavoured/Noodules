'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Microscope, Loader } from 'lucide-react'
import { toast } from 'sonner'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement Supabase login
      toast.success('Signed in successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to sign in')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-8 border border-border/40 bg-card">
      <div className="flex items-center gap-2 mb-8">
        <Microscope className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Noodules</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to continue learning</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            Create One
          </Link>
        </p>
      </div>
    </Card>
  )
}
