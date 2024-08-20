'use client'

import { AccountProfileAccordion } from '../account-profile-accordion'
import { AlternateInfoForm } from './alternate-info-form.tsx'

const AlternateInfoCard = () => {
  return (
    <AccountProfileAccordion
      title="Alternate/Previous Information"
      content={renderAlternateInfoForm}
    />
  )
}

const renderAlternateInfoForm = (isEdit: boolean, handleSave: () => void) => (
  <AlternateInfoForm isEdit={isEdit} handleSave={handleSave} />
)

export { AlternateInfoCard }
