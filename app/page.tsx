'use client';

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Microscope, Zap, Users, Brain, BarChart3, Globe } from 'lucide-react'

export default function Home() {
  // Ensure the page is mounted before running complex entrance animations
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur-md opacity-75"></div>
              <div className="relative bg-background rounded-lg p-2">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Noodules
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="hover:bg-muted transition-colors">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white border-0 shadow-md">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                The Future of Parasite Learning
              </span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
            Master Parasites with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interactive 3D</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Immersive 3D visualization, intelligent learning tools, and study features designed specifically for the next generation of biomedical scientists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white text-base px-10 border-0 shadow-xl hover:scale-105 transition-transform">
                Start Learning Free
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-base px-10 bg-background/50 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto border-t border-border pt-12">
            <div>
              <div className="text-3xl font-bold text-foreground">50K+</div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">Active Students</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">25+</div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">Parasite Species</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">4.9/5</div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Powerful Features Built for Success
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master parasitology in one intelligent platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Microscope className="w-6 h-6 text-primary" />}
              title="Interactive 3D Models"
              description="Explore parasites from every angle with realistic 3D visualization. Rotate, zoom, and interact with detailed structures."
              gradient="from-primary to-secondary"
            />
            <FeatureCard 
              icon={<Brain className="w-6 h-6 text-secondary" />}
              title="Smart Learning"
              description="Adaptive flashcards, intelligent quizzes, and spaced repetition algorithms that personalize your learning journey."
              gradient="from-secondary to-accent"
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-accent" />}
              title="Collaborate & Share"
              description="Join study groups, participate in forums, and learn together with a global community of students."
              gradient="from-accent to-primary"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              title="Progress Analytics"
              description="Track your learning progress with detailed analytics, performance metrics, and personalized insights."
              gradient="from-primary to-secondary"
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-secondary" />}
              title="Offline Access"
              description="Download your courses and study offline. Seamless sync when you're back online."
              gradient="from-secondary to-accent"
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-accent" />}
              title="Cross-Platform"
              description="Learn on web, mobile, or desktop. Your progress syncs seamlessly across all your devices."
              gradient="from-accent to-primary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Master Parasitology?
          </h3>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of students already learning with Noodules. Start your 3D journey today.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-12 py-7 rounded-full border-0 shadow-2xl hover:scale-105 transition-all">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer (Condensed) */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <Microscope className="w-5 h-5 text-primary" />
               <span className="font-bold text-lg">Noodules</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Noodules. Built for the next generation of biomedical scientists.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Reusable Feature Card Component for cleaner code
function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  gradient: string 
}) {
  return (
    <Card className="group p-8 border border-border bg-background hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative w-12 h-12 mb-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity`}></div>
        <div className="relative bg-muted rounded-lg p-2 flex items-center justify-center border border-border">
          {icon}
        </div>
      </div>
      <h4 className="text-xl font-bold text-foreground mb-3">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  )
}