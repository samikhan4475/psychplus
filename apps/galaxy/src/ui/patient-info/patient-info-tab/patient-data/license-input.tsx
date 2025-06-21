'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { TextField } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { isEmptyDriverLicense } from '../utils'
import { PatientDataSchema } from './patient-data-schema'

const LicenseInput = () => {
  const form = useFormContext<PatientDataSchema>()
  const { register, control, setError, clearErrors } = form

  const driversLicense = useWatch({ control, name: 'driversLicense' })

  const [isRequired, setIsRequired] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const required = !isEmptyDriverLicense(driversLicense)
    setIsRequired(required && !!driversLicense?.validIn)
    setIsError(required && !!driversLicense?.validIn && !driversLicense?.number)
    if (required && !!driversLicense?.validIn && !driversLicense?.number) {
      setError('driversLicense.number', {
        type: 'required',
        message: 'required',
      })
    }
  }, [driversLicense, setError, clearErrors])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required={isRequired}>
        Driving License
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Driving License"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...register('driversLicense.number')}
      />
      {isError && <FormFieldError name="driversLicense.number" />}
    </FormFieldContainer>
  )
}

export { LicenseInput }
