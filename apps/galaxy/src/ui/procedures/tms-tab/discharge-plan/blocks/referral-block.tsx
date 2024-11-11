import React from 'react'
import { FormFieldContainer, FormFieldLabel, TextAreaInput } from '@/components'

const ReferralBlock = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Referral</FormFieldLabel>
      <TextAreaInput field="referralDetail" className="h-full w-full" />
    </FormFieldContainer>
  )
}

export default ReferralBlock
