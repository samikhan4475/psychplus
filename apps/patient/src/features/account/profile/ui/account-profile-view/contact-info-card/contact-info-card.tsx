import { FeatureCard } from '@/components-v2'
import { AddressForm } from './address-form'
import { EmailAddressForm } from './email-address-form'
import { PhoneNumberForm } from './phone-number-form'

const ContactInfoCard = () => {
  return (
    <FeatureCard title="Contact Information" contentClassName="gap-3">
      <EmailAddressForm />
      <PhoneNumberForm />
      <AddressForm />
    </FeatureCard>
  )
}

export { ContactInfoCard }
