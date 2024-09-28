'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getClinicLocations } from '../../actions'
import { StateCodeSet } from '../../types'
import { SchemaType } from '../schema'

const LocationSelect = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const prevStateCode = useRef<string | undefined>(undefined)
  const [locations, setLocations] = useState<
    { value: string; label: string }[]
  >([])
  const stateCode = form.watch('state')

  useEffect(() => {
    if (prevStateCode.current !== stateCode) {
      prevStateCode.current = stateCode
      const state =
        states.filter((state) => state.stateCode === stateCode)?.[0] || {}
      if (state.id) {
        form.resetField('location')
        getClinicLocations(state.id).then((res) => {
          if (res.state === 'error') {
            toast.error('Failed to fetch locations')
            return setLocations([])
          }
          setLocations(
            res.data.map((location) => ({
              value: location.id,
              label: location.name,
            })),
          )
        })
      }
    }
  }, [states, stateCode, form])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Location</FormFieldLabel>
      <SelectInput
        options={locations}
        buttonClassName="flex-1 w-full"
        field="location"
      />
      <FormFieldError name={'location'} />
    </FormFieldContainer>
  )
}

export { LocationSelect }
