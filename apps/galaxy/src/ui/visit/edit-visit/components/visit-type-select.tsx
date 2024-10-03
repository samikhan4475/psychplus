'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getVisitTypes } from '@/ui/visit/actions'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const VisitTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const { visitTypes, setVisitTypes } = useEditVisitStore()

  const [locationId, serviceId, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['location', 'service', 'isServiceTimeDependent'],
  })

  useEffect(() => {
    if (serviceId && locationId) {
      getVisitTypes({ serviceId, locationId }).then((res) => {
        if (res.state === 'error') {
          toast.error('Failed to fetch visit types')
          return setVisitTypes([])
        }
        setVisitTypes(res.data)
      })
    }
  }, [serviceId, locationId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={visitTypes.map((visitType) => ({
          value: visitType.encouterType,
          label: `${visitType.encouterType} | ${visitType.visitSequence} | ${visitType.visitMedium}`,
        }))}
        buttonClassName="flex-1 w-full"
        onValueChange={(newValue) => {
          const visitType = visitTypes.find(
            (vt) => vt.encouterType === newValue,
          )
          form.setValue('visitType', newValue)
          form.setValue('visitSequence', visitType?.visitSequence ?? '')
          form.setValue('visitMedium', visitType?.visitMedium ?? '')
        }}
        disabled={!isServiceTimeDependent}
      />
      <FormFieldError name="visitType" />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
