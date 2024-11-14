'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PlanName = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1" required>
        Plan
      </FormFieldLabel>
      <TextInput field="payerName" placeHolder="Name" className="w-full"/>
    </FormFieldContainer>
  )
}

export { PlanName }
