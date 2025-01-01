'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getClinicLocations } from '../../actions'
import { StateCodeSet } from '../../types'
import { SchemaType } from '../schema'

const LocationDropdown = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<SelectOptionType[]>([])
  const stateCode = useWatch({
    control: form.control,
    name: 'state',
  })

  useEffect(() => {
    const state = states.find((state) => state.stateCode === stateCode)
    if (state?.id) {
      setLoading(true)
      form.resetField('location')
      getClinicLocations(state?.id).then((res) => {
        setLoading(false)
        if (res.state === 'error') return setLocations([])
        setLocations(res.data)
      })
    }
  }, [stateCode, states])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Location</FormFieldLabel>
      <SelectInput
        field="location"
        options={locations}
        buttonClassName="h-6 w-full"
        disabled={!stateCode}
        loading={loading}
      />
      <FormFieldError name={'location'} />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
