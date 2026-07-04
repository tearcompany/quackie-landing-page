import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { WhoWroteThis } from '@/components/who-wrote-this'
import { SocialProof } from '@/components/social-proof'
import { ProblemSolution } from '@/components/problem-solution'
import { HowItWorks } from '@/components/how-it-works'
import { GitHistoryShowcase } from '@/components/git-history-showcase'
import { PersonaTeaser } from '@/components/persona-teaser'
import { FeaturesGrid } from '@/components/features-grid'
import { Architecture } from '@/components/architecture'
import { Install } from '@/components/install'
import { SettingsReference } from '@/components/settings-reference'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Interactive demo: same commit, six personas */}
      <WhoWroteThis />

      {/* Social proof strip */}
      <SocialProof />

      {/* Problem → Solution */}
      <ProblemSolution />

      {/* How it works */}
      <HowItWorks />

      {/* Example git history rewritten by personas */}
      <GitHistoryShowcase />

      {/* Curated persona teaser — full list lives on /personas */}
      <PersonaTeaser />

      {/* Features grid */}
      <FeaturesGrid />

      {/* Architecture */}
      <Architecture />

      {/* Install */}
      <Install />

      {/* Settings reference */}
      <SettingsReference />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  )
}
