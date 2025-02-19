'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option, SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([])
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()

  useEffect(() => {
    setLoading(true)
    getProvidersOptionsAction().then((response) => {
      setLoading(false)
      if (response.state === 'error') setOptions([])
      else setOptions(response.data)
    })
  }, [])

  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Provider</FieldLabel>
      <MultiSelectField
        defaultValues={form.watch('providerIds')}
        options={options}
        className="flex-1"
        onChange={(values) => {
          form.setValue('providerIds', values, { shouldDirty: true })
        }}
        menuClassName="w-[155px]"
        loading={loading}
        disabled={loading}
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
