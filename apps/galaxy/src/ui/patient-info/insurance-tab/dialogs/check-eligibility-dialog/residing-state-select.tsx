'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { StateCodeSet } from '@/ui/visit/types'
import { getResidingStateAction } from './actions'
import { SchemaType } from './schema'

const ResidingStateSelect = ({
  loadingStates,
  states,
}: {
  loadingStates: boolean
  states: StateCodeSet[]
}) => {
  const form = useFormContext<SchemaType>()
  const patientId = form.watch('patientId')
  const options = states.map((v) => ({
    label: v.stateName,
    value: v.stateCode,
  }))

  useEffect(() => {
    ;(async () => {
      if (!patientId) return
      const result = await getResidingStateAction(patientId)
      if (result.state === 'error') return
      const { patientResidingStateCode } = result.data
      form.setValue('residingStateCode', patientResidingStateCode)
    })()
  }, [patientId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Residing State</FormFieldLabel>
      <SelectInput
        field="residingStateCode"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!patientId}
        loading={loadingStates}
      />
      <FormFieldError name="residingStateCode" />
    </FormFieldContainer>
  )
}

export { ResidingStateSelect }
