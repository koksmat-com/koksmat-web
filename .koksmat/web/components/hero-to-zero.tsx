import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'

export default function FromHeroToZero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Hero Section */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              From Hero to Zero
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              How a new born neuro diverse guy decided to shift from being a Hero on the Microsoft 365
              stack to begin from zero
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>25 min presentation</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>20 min Q&A</span>
              </Badge>
            </div>
          </div>

          {/* Journey Diagram */}
          <Card className="overflow-hidden bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <Image
                src="/hero-to-zero.png"
                alt="Journey diagram showing the path from Peak of Mount Stupid through Valley of Despair and Slope of Enlightenment to Plateau of Sustainability"
                width={1200}
                height={600}
                className="rounded-lg"
                priority
              />
            </CardContent>
          </Card>

          {/* Key Points */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-2 text-lg font-semibold">The Hero Journey</h2>
                <p className="text-muted-foreground">
                  From mastering the Microsoft 365 stack to recognizing the need for a fundamental
                  shift in approach.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-2 text-lg font-semibold">The Zero Trust Path</h2>
                <p className="text-muted-foreground">
                  Embracing new beginnings and building with zero trust principles from the ground up.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

