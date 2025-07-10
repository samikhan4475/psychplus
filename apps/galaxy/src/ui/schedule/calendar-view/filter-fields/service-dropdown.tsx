import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { useServiceCodesMap } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import {
  Option,
  SchedulerFilters,
  type CalenderViewSchemaType,
} from '../../types'
import { getServiceFilterOptions } from '../../utils'

const ServiceDropdown = () => {
  const form = useFormContext<CalenderViewSchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocations = form.watch('locationIds')
  const services = form.getValues('serviceIds')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()
  const { filters } = useFiltersContext()

  useEffect(() => {
    if (selectedLocations.length) {
      setLoading(true)
      getLocationServicesAction(selectedLocations).then((response) => {
        setLoading(false)
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocations])

  const handleServiceChange = (values: string[]) => {
    form.setValue('serviceIds', values, { shouldDirty: true })
    form.setValue('unitIds',[])
    form.setValue('roomIds',[])
    form.setValue('groupIds',[])
    const currentOptions = servicesOptions
    const selectedLabels = values
      .map(
        (value) =>
          currentOptions.find((option) => option.value === value)?.label,
      )
      .filter((label): label is string => label !== undefined)
    form.setValue('servicesOffered', selectedLabels, { shouldDirty: true })
  }

  if (!filters.includes(SchedulerFilters.Service)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocations.length}
        defaultValues={services}
        options={getServiceFilterOptions(mappedServices, servicesOptions)}
        className="flex-1"
        onChange={handleServiceChange}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
