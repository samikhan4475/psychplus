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
import { getClinicLocations } from '@/ui/visit/actions'
import { StateCodeSet } from '@/ui/visit/types'
import { SchemaType } from '../../schema'

const DCLocationSelect = ({ states }: { states: StateCodeSet[] }) => {
  const form = useFormContext<SchemaType>()
  const [locations, setLocations] = useState<SelectOptionType[]>([])

  const [visitType, stateCode] = useWatch({
    name: ['visitType', 'state'],
    control: form.control,
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
  }, [states, stateCode])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>DC Location</FormFieldLabel>
      <SelectInput
        field="dcLocation"
        buttonClassName="h-6 w-full"
        options={locations}
        disabled={!visitType}
        placeholder="Select"
      />
      <FormFieldError name="dcLocation" />
    </FormFieldContainer>
  )
}

export { DCLocationSelect }
