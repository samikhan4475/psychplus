'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { SchemaType } from '../filter-actions-group'

const ProviderDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([])
  const form = useFormContext<SchemaType>()

  useEffect(() => {
    setLoading(true)
    getProvidersOptionsAction().then((response) => {
      setLoading(false)
      if (response.state === 'error') setOptions([])
      else setOptions(response.data)
    })
  }, [])

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Provider</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('staffIds')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('staffIds', values, { shouldDirty: true })
        }}
        loading={loading}
        disabled={loading}
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
