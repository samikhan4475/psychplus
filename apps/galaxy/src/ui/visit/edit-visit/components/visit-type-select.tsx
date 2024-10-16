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
import { getLocationServices } from '@/ui/visit/actions'
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
    if (locationId && serviceId) {
      getLocationServices({
        locationId,
        serviceIds: [serviceId],
        includeServiceVisitType: true,
      }).then((res) => {
        if (res.state === 'error') {
          toast.error(res.error)
          return setVisitTypes([])
        }
        setVisitTypes(res.data[0].serviceVisitTypes ?? [])
      })
    }
  }, [serviceId, locationId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={visitTypes.map((visitType) => ({
          value: visitType.typeOfVisit,
          label: `${visitType.visitTypeCode} | ${visitType.visitSequence} | ${visitType.visitMedium}`,
        }))}
        buttonClassName="h-6 w-full"
        disabled={!isServiceTimeDependent}
        onValueChange={(newValue) => {
          const visitType = visitTypes.find(
            (vt) => vt.typeOfVisit === newValue,
          )
          form.setValue('visitType', newValue)
          form.setValue('visitSequence', visitType?.visitSequence ?? '')
          form.setValue('visitMedium', visitType?.visitMedium ?? '')
        }}
      />
      <FormFieldError name="visitType" />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
