'use client'

import { AccountProfileAccordion } from '../account-profile-accordion'
import { AdditionalContactForm } from './additional-contact-form.tsx'

const AdditionalContactCard = () => {
  return (
    <AccountProfileAccordion
      title="Additional Contact Information"
      content={renderAlternateInfoForm}
    />
  )
}

const renderAlternateInfoForm = (isEdit: boolean, handleSave: () => void) => (
  <AdditionalContactForm isEdit={isEdit} handleSave={handleSave} />
)

export { AdditionalContactCard }
