import React from 'react'
import { FormFieldContainer, FormFieldLabel, TextAreaInput } from '@/components'

const ReferralBlock = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Referral</FormFieldLabel>
      <TextAreaInput field="dizziness.details" className="h-full w-full" />
    </FormFieldContainer>
  )
}

export default ReferralBlock
