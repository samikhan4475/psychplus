'use client'

import { CheckboxInput } from '@/components'

const TestPatientCheckbox = () => {
  return (
    <CheckboxInput
      label="Test Patient"
      field="isTest"
      labelClassName="!font-medium !text-black !text-1"
    />
  )
}

export { TestPatientCheckbox }
