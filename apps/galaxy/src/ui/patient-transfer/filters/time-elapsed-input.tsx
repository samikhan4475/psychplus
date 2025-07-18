import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TimeInput,
} from '@/components'

const TimeElapsedInput = () => {
  return (
    <FormFieldContainer className=" flex-row items-center gap-2 ">
      <FormFieldLabel>Time Elapsed</FormFieldLabel>
      <TimeInput field="timeElapsed" />

      <FormFieldError name="TimeElapsed" />
    </FormFieldContainer>
  )
}

export { TimeElapsedInput }
