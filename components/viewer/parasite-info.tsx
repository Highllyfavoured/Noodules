import { Badge } from '@/components/ui/badge'

interface Parasite {
  id: string
  name: string
  description: string
  category: string
  features: string[]
}

interface ParasiteInfoProps {
  parasite: Parasite
}

export function ParasiteInfo({ parasite }: ParasiteInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{parasite.name}</h2>
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
          {parasite.category}
        </Badge>
      </div>

      <p className="text-muted-foreground leading-relaxed">
        {parasite.description}
      </p>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
        <ul className="space-y-2">
          {parasite.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Pro Tip:</strong> Use your mouse to rotate and zoom the 3D model. Click and drag to explore different angles.
        </p>
      </div>
    </div>
  )
}
