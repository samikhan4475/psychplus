'use client'

import { AccountProfileAccordion } from '../account-profile-accordion'
import { PersonalInfoForm } from './personal-info-form'

const PersonalInfoCard = () => {
  return (
    <AccountProfileAccordion
      title="Personal Information"
      content={renderPersonalInfoForm}
    />
  )
}

const renderPersonalInfoForm = (isEdit: boolean, handleSave: () => void) => (
  <PersonalInfoForm isEdit={isEdit} handleSave={handleSave} />
)

export { PersonalInfoCard }
