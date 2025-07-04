'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../client-actions'
import { useServiceCodesMap } from '../../hooks'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { getServiceFilterOptions } from '../../utils'

const ServiceDropdown = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocations = form.watch('locationIds')
  const services = form.getValues('servicesOffered')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()

  useEffect(() => {
    if (selectedLocations?.length) {
      setLoading(true)
      getLocationServicesAction(selectedLocations).then((response) => {
        setLoading(false)
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocations])

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocations?.length}
        defaultValues={services}
        options={getServiceFilterOptions(mappedServices, servicesOptions)}
        className="flex-1"
        onChange={(values) => form.setValue('servicesOffered', values)}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
