'use client'

import { AccountProfileAccordion } from '../account-profile-accordion'
import { AddressForm } from './address-form'

const AddressCard = () => {
  return (
    <AccountProfileAccordion title="Address" content={renderPersonalInfoForm} />
  )
}

const renderPersonalInfoForm = (isEdit: boolean, handleSave: () => void) => (
  <AddressForm isEdit={isEdit} handleSave={handleSave} />
)

export { AddressCard }
