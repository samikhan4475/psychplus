'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PlanName = () => {
  return (
      <FormFieldContainer className="flex-1 gap-0">
        <FormFieldLabel className="!text-1" required>
          Plan
        </FormFieldLabel>
        <TextInput field="name" placeHolder="Plan Name" className="w-full" />
        <FormFieldError name="name" />
      </FormFieldContainer>
  )
}

export { PlanName }
