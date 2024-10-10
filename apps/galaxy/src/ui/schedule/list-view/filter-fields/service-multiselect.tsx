'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../actions'
import { BookedAppointmentsSchemaType } from '../../schema'
import { Option } from '../../types'
import { FormFieldContainer } from '../../shared'

const ServiceMultiSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const selectedLocation = form.watch('locationId')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])

  useEffect(() => {
    if (selectedLocation) {
      getLocationServicesAction(selectedLocation).then((response) => {
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocation])

  return (
    <FormFieldContainer>
      <FormFieldLabel>Service</FormFieldLabel>
      <MultiSelectField
        disabled={!selectedLocation}
        options={servicesOptions}
        className="flex-1"
        onChange={(values) => form.setValue('serviceIds', values)}
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
