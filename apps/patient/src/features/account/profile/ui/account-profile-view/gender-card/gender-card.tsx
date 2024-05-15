import { FeatureCard } from '@/components-v2'
import { GenderExpressionForm } from './gender-expression-form'
import { GenderForm } from './gender-form'
import { GenderOrientationForm } from './gender-orientation-form'
import { GenderPronounsForm } from './gender-pronouns-form'

const GenderCard = () => {
  return (
    <FeatureCard title="Gender" contentClassName="gap-3">
      <GenderForm />
      <GenderOrientationForm />
      <GenderExpressionForm />
      <GenderPronounsForm />
    </FeatureCard>
  )
}

export { GenderCard }
