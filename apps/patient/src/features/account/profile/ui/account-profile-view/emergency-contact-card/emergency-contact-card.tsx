import { FeatureCard } from '@/components-v2'
import { EmergencyContactForm } from './emergency-contact-form'
import { GuardianForm } from './guardian-form'

const EmergencyContactCard = () => {
  return (
    <FeatureCard title="Guardian/Emergency Contact" contentClassName="gap-3">
      <GuardianForm />
      <EmergencyContactForm />
    </FeatureCard>
  )
}

export { EmergencyContactCard }
