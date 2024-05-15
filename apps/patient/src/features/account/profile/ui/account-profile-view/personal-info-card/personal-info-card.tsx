import { FeatureCard } from '@/components-v2'
import { DobForm } from './dob-form'
import { NameForm } from './name-form'
import { PreferredLanguageForm } from './preferred-language-form'
import { PreferredNameForm } from './preferred-name-form'
import { SSNForm } from './ssn-form'

const PersonalInfoCard = () => {
  return (
    <FeatureCard title="Personal Information" contentClassName="gap-3">
      <NameForm />
      <PreferredNameForm />
      <PreferredLanguageForm />
      <DobForm />
      <SSNForm />
    </FeatureCard>
  )
}

export { PersonalInfoCard }
