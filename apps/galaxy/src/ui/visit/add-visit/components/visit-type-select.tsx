'use client'

import { useEffect, useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { VisitType } from '@/types'
import { getLocationServices } from '../../client-actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'
import { transformNonTimedVisitTypes } from '../transform'
import { SlotDetails } from '../types'

const VisitTypeDropdown = ({ slotDetails }: { slotDetails?: SlotDetails }) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const { visitTypes, setVisitTypes, setGroupedVisitTypes } = useAddVisitStore()
  const [
    dateOfAdmission,
    patient,
    state,
    locationId,
    serviceId,
    providerType,
    provider,
    isServiceTimeDependent,
  ] = useWatch({
    control: form.control,
    name: [
      'dateOfAdmission',
      'patient',
      'state',
      'location',
      'service',
      'providerType',
      'provider',
      'isServiceTimeDependent',
    ],
  })

  const isDisabledTimed = slotDetails
    ? false
    : !locationId ||
      !serviceId ||
      !providerType ||
      !provider ||
      !patient ||
      !state

  const isDisabledNonTimed =
    !patient || !state || !location || !serviceId || !dateOfAdmission

  useEffect(() => {
    if (locationId && serviceId) {
      setLoading(true)
      setVisitTypes([])
      setGroupedVisitTypes({})
      getLocationServices({
        includeServiceVisitType: true,
        locationIds: [locationId],
        locationServiceIds: [serviceId],
      }).then((res) => {
        setLoading(false)
        if (res.state === 'error') {
          setVisitTypes([])
          return toast.error(res.error || 'Failed to fetch visit types')
        }
        if (!isServiceTimeDependent) {
          const { filteredVisitTypes, groupedVisitTypes } =
            transformNonTimedVisitTypes(res.data[0]?.serviceVisitTypes ?? [])
          setGroupedVisitTypes(groupedVisitTypes)
          setVisitTypes(filteredVisitTypes)
        } else {
          setVisitTypes(res.data[0]?.serviceVisitTypes ?? [])
        }
      })
    }
  }, [locationId, serviceId])

  const options = useMemo(
    () =>
      visitTypes.map((visitType) => ({
        label: isServiceTimeDependent
          ? `${visitType.typeOfVisit} | ${visitType.visitSequence} | ${visitType.visitMedium}`
          : visitType.typeOfVisit,
        value: isServiceTimeDependent
          ? visitType.encouterType
          : visitType.visitTypeCode,
      })),
    [visitTypes, isServiceTimeDependent],
  )

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitType"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={isServiceTimeDependent ? isDisabledTimed : isDisabledNonTimed}
        loading={loading}
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
