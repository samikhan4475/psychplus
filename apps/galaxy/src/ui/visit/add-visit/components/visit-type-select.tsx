'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getVisitTypes } from '../actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'

const VisitTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const { visitTypes, setVisitTypes } = useAddVisitStore()

  const locationId = form.watch('location')
  const serviceId = form.watch('service')
  const providerType = form.watch('providerType')
  const provider = form.watch('provider')

  const isDisabled = !locationId && !serviceId && !providerType && !provider

  useEffect(() => {
    if (locationId && serviceId) {
      getVisitTypes({ locationId, serviceId }).then((res) => {
        if (res.state === 'error') return setVisitTypes([])
        setVisitTypes(res.data)
      })
    }
  }, [locationId, serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={visitTypes.map((visitType) => ({
          label: `${visitType.encouterType} | ${visitType.visitSequence} | ${visitType.visitMedium}`,
          value: visitType.encouterType,
        }))}
        buttonClassName="flex-1 w-full"
        disabled={isDisabled}
        onValueChange={(newValue) => {
          const visitType = visitTypes.find(
            (vt) => vt.encouterType === newValue,
          )
          form.setValue('visitType', newValue)
          form.setValue('visitMedium', visitType?.visitMedium ?? '')
          form.setValue('visitSequence', visitType?.visitSequence ?? '')
        }}
      />
      <FormFieldError name="visitType" />
    </FormFieldContainer>
  )
}

export { VisitTypeDropdown }
