'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
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

const LocationSelect = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<SelectOptionType[]>([])
  const [stateCode, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['state', 'isServiceTimeDependent'],
  })

  useEffect(() => {
    const state =
      states.filter((state) => state.stateCode === stateCode)?.[0] || {}
    if (!state.id) return
    form.resetField('location')
    setLoading(true)
    getClinicLocations(state.id).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        toast.error(res.error || 'Failed to fetch locations')
        return setLocations([])
      }
      setLocations(res.data)
    })
  }, [stateCode, states])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Location</FormFieldLabel>
      <SelectInput
        options={locations}
        buttonClassName="h-6 w-full"
        field="location"
        disabled={!isServiceTimeDependent}
        loading={loading}
      />
      <FormFieldError name={'location'} />
    </FormFieldContainer>
  )
}

export { LocationSelect }
