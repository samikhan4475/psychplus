import React from 'react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AgeField } from './age-field'

const AgeRangeField = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Age Range</FormFieldLabel>
      <AgeField field="minimumAge" placeholder="From" />
      -
      <AgeField field="maximumAge" placeholder="To" />
    </FormFieldContainer>
  )
}

export { AgeRangeField }
