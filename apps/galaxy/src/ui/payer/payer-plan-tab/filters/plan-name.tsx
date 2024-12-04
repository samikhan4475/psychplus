'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PlanName = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Plan</FormFieldLabel>
      <TextInput field="name" className="w-full" placeHolder="Plan Name" />
    </FormFieldContainer>
  )
}

export { PlanName }
