'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getPracticeIdsAction } from '@/actions'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { SchemaType } from '../schema'

const PracticeSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const form = useFormContext<SchemaType>()
  const location = form.watch('location')

  const getPractices = async () => {
    setDisabled(false)
    setLoading(true)

    const result = await getPracticeIdsAction(location)
    if (result.state === 'success') {
      setOrganizations(result.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    if (location) getPractices()
  }, [location])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Practice</FormFieldLabel>
      <SelectInput
        field="practiceId"
        options={organizations}
        placeholder="Select"
        className="flex-1"
        buttonClassName="w-full h-6"
        loading={loading}
        disabled={disabled}
      />
      <FormFieldError name="practiceId" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
