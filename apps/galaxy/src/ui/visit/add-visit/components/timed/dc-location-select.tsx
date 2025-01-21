'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { SelectInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SelectOptionType } from '@/types'
import { getClinicLocations } from '@/ui/visit/client-actions'
import { StateCodeSet } from '@/ui/visit/types'
import { SchemaType } from '../../schema'

const DCLocationSelect = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [locations, setLocations] = useState<SelectOptionType[]>([])

  const [stateCode, visitType] = useWatch({
    control: form.control,
    name: ['state', 'visitType'],
  })

  useEffect(() => {
    const state = states.find((state) => state.stateCode === stateCode)
    if (state?.id) {
      form.resetField('dcLocation')
      getClinicLocations(state?.id).then((res) => {
        if (res.state === 'error') return setLocations([])
        setLocations(res.data)
      })
    }
  }, [stateCode, states])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>DC Location</FormFieldLabel>
      <SelectInput
        field="dcLocation"
        options={locations}
        buttonClassName="h-6 w-full"
        placeholder="Select"
        disabled={!visitType}
      />
      <FormFieldError name="dcLocation" />
    </FormFieldContainer>
  )
}

export { DCLocationSelect }
