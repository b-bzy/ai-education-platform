import { Hero } from '@/components/home/Hero'
import { FeatureGrid } from '@/components/home/FeatureGrid'
import { Highlights } from '@/components/home/Highlights'
import { CTA } from '@/components/home/CTA'

export default function Page() {
  return (
    <div className="space-y-8">
      <Hero />
      <Highlights />
      <FeatureGrid />
      <CTA />
    </div>
  )
}
