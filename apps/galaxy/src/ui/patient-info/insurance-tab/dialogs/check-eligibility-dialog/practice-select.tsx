'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getPracticesOptionsAction } from '@/ui/patient-lookup/actions'
import { SchemaType } from './schema'

const PracticeSelect = () => {
  const form = useFormContext<SchemaType>()
  const locationId = form.watch('locationId')
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (!locationId) return
      setDisabled(false)
      setLoading(true)
      form.setValue('practiceId', '')
      const result = await getPracticesOptionsAction({
        payload: { locationId },
      })
      setLoading(false)
      if (result.state === 'success') setOrganizations(result.data)
    })()
  }, [locationId])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <SelectInput
        field="practiceId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        className="w-full"
        loading={loading}
        disabled={disabled || !locationId}
      />
      <FormFieldError name="practiceId" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
