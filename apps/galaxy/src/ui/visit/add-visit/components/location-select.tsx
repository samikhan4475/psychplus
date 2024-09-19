'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getClinicLocations } from '../actions'
import { SchemaType } from '../schema'
import { StateCodeSet } from '../types'

const LocationDropdown = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [locations, setLocations] = useState<
    { label: string; value: string }[]
  >([])
  const stateCode = form.watch('state')
  const prevStateCode = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (prevStateCode.current !== stateCode) {
      prevStateCode.current = stateCode
      const state =
        states.filter((state) => state.stateCode === stateCode)?.[0] || {}
      if (state.id) {
        form.resetField('location')
        getClinicLocations(state.id).then((res) => {
          if (res.state === 'error') return setLocations([])
          setLocations(
            res.data.map((location) => ({
              label: location.name,
              value: location.id,
            })),
          )
        })
      }
    }
  }, [stateCode, states, form])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Location</FormFieldLabel>
      <SelectInput
        field="location"
        options={locations}
        buttonClassName="flex-1"
        disabled={!stateCode}
      />
      <FormFieldError name={'location'} />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
