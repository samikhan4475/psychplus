'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getProvidersOptionsAction } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option, SchedulerFilters } from '../../types'
import { getSelectedOptions } from '../../utils'

const ProviderDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([])
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const [stateIds, locationIds] = useWatch({
    control: form.control,
    name: ['stateIds', 'locationIds'],
  })

  const { filters } = useFiltersContext()

  useEffect(() => {
    setLoading(true)
    getProvidersOptionsAction({ stateIds, locationIds }).then((response) => {
      setLoading(false)
      if (response.state === 'error') setOptions([])
      else {
        const selectedProviders = form.getValues('providerIds')
        setOptions(response.data)
        form.setValue(
          'providerIds',
          getSelectedOptions(selectedProviders, response.data),
        )
      }
    })
  }, [stateIds, locationIds])

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
