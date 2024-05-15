'use client'

import { FormSubmitButton } from '../form'
import { useToggleableFormContext } from './context'

const SaveButton = () => {
  const { disabled } = useToggleableFormContext()
  return (
    <FormSubmitButton size="3" disabled={disabled} highContrast>
      Save
    </FormSubmitButton>
  )
}

export { SaveButton }
