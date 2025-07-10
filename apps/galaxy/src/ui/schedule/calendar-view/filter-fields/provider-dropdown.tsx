import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { DropdownSelect } from '@/components'
import { SelectOptionType } from '@/types'
import { getProvidersOptionsAction } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { CalenderViewSchemaType, SchedulerFilters } from '../../types'
import { getSelectedOption } from '../../utils'

const ProviderDropdown = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
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
        const selectedProvider = form.getValues('providerIds') ?? ''
        setOptions(response.data)
        form.setValue(
          'providerIds',
          getSelectedOption(selectedProvider, response.data),
        )
      }
    })
  }, [stateIds, locationIds])

  if (!filters.includes(SchedulerFilters.Provider)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider</FieldLabel>
      <DropdownSelect
        field="providerIds"
        options={options}
        loading={loading}
        shouldDirty
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
