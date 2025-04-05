'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { getSelectedOptions } from '../../utils'
import { SchemaType } from '../filter-actions-group'

const ProviderDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([])
  const form = useFormContext<SchemaType>()
  const [stateIds, locationIds] = useWatch({
    control: form.control,
    name: ['stateIds', 'locationIds'],
  })

  useEffect(() => {
    setLoading(true)
    getProvidersOptionsAction({ stateIds, locationIds }).then((response) => {
      setLoading(false)
      if (response.state === 'error') setOptions([])
      else {
        const selectedProviders = form.getValues('staffIds')
        setOptions(response.data)
        form.setValue(
          'staffIds',
          getSelectedOptions(selectedProviders, response.data),
        )
      }
    })
  }, [stateIds, locationIds])

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
