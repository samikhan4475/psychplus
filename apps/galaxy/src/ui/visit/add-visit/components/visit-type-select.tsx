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
import { getLocationServices } from '../../actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'

const VisitTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const { visitTypes, setVisitTypes } = useAddVisitStore()
  const [
    locationId,
    serviceId,
    providerType,
    provider,
    isServiceTimeDependent,
  ] = useWatch({
    control: form.control,
    name: [
      'location',
      'service',
      'providerType',
      'provider',
      'isServiceTimeDependent',
    ],
  })

  const isDisabled =
    !locationId ||
    !serviceId ||
    !providerType ||
    (isServiceTimeDependent ? !provider : false)

  useEffect(() => {
    if (locationId && serviceId) {
      getLocationServices({
        includeServiceVisitType: true,
        locationId,
        serviceIds: [serviceId],
      }).then((res) => {
        if (res.state === 'error') {
          setVisitTypes([])
          return toast.error(res.error)
        }
        setVisitTypes(res.data[0].serviceVisitTypes ?? [])
      })
    }
  }, [locationId, serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={visitTypes.map((visitType) => ({
          label: `${visitType.typeOfVisit} | ${visitType.visitSequence} | ${visitType.visitMedium}`,
          value: visitType.visitTypeCode,
        }))}
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
        onValueChange={(newValue) => {
          const visitType = visitTypes.find(
            (vt) => vt.visitTypeCode === newValue,
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
