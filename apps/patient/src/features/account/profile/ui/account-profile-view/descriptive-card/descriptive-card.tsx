'use client'

import { AccountProfileAccordion } from '../account-profile-accordion'
import { DescriptiveForm } from './descriptive-form'

const DescriptiveCard = () => {
  return (
    <AccountProfileAccordion
      title="Descriptive"
      content={renderPersonalInfoForm}
    />
  )
}

const renderPersonalInfoForm = (isEdit: boolean, handleSave: () => void) => (
  <DescriptiveForm isEdit={isEdit} handleSave={handleSave} />
)

export { DescriptiveCard }
