'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getClinicLocations } from '@/ui/visit/client-actions'
import { StateCodeSet } from '@/ui/visit/types'
import { SchemaType } from './schema'

const LocationDropdown = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<SelectOptionType[]>([])
  const stateCode = form.watch('residingStateCode')

  useEffect(() => {
    ;(async () => {
      const state = states.find((state) => state.stateCode === stateCode)
      if (state?.id) {
        setLoading(true)
        form.resetField('locationId')
        const result = await getClinicLocations(state?.id)
        setLoading(false)
        if (result.state === 'error') return setLocations([])
        setLocations(result.data)
      }
    })()
  }, [stateCode, states])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        options={locations}
        buttonClassName="h-6 w-full"
        disabled={!stateCode}
        loading={loading}
      />
      <FormFieldError name="locationId" />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
