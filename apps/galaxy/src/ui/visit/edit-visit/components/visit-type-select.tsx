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
import { getLocationServices } from '@/ui/visit/client-actions'
import { transformNonTimedVisitTypes } from '../../add-visit/transform'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const VisitTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const { visitTypes, setVisitTypes, setGroupedVisitTypes } =
    useEditVisitStore()

  const [
    locationId,
    serviceId,
    isServiceTimeDependent,
    visitType,
    visitSequence,
    visitMedium,
  ] = useWatch({
    control: form.control,
    name: [
      'location',
      'service',
      'isServiceTimeDependent',
      'visitType',
      'visitSequence',
      'visitMedium',
    ],
  })

  useEffect(() => {
    if (locationId && serviceId) {
      setLoading(true)
      getLocationServices({
        locationId,
        locationServiceIds: [serviceId],
        includeServiceVisitType: true,
      }).then((res) => {
        setLoading(false)
        if (res.state === 'error') {
          toast.error(res.error || 'Failed to fetch services')
          return setVisitTypes([])
        }
        if (!isServiceTimeDependent) {
          const { filteredVisitTypes, groupedVisitTypes } =
            transformNonTimedVisitTypes(res.data[0]?.serviceVisitTypes ?? [])
          setGroupedVisitTypes(groupedVisitTypes)
          setVisitTypes(filteredVisitTypes)
        } else {
          const serviceVisitTypes = res.data[0]?.serviceVisitTypes ?? []
          setVisitTypes(serviceVisitTypes)
          const selectedVisitType = serviceVisitTypes.find(
            (vt) =>
              vt.visitTypeCode === visitType &&
              vt.visitSequence === visitSequence &&
              vt.visitMedium === visitMedium,
          )
          if (selectedVisitType?.encouterType)
            form.setValue('visitType', selectedVisitType?.encouterType)
        }
      })
    }
  }, [serviceId, locationId])

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
        disabled={!isServiceTimeDependent}
        loading={loading}
        onValueChange={(newValue) => {
          if (!newValue) return
          const visitType = visitTypes.find(
            (vt) => vt.encouterType === newValue,
          )
          form.setValue('visitType', newValue, { shouldDirty: true })
          form.setValue('visitMedium', visitType?.visitMedium ?? '')
          form.setValue('visitSequence', visitType?.visitSequence ?? '')
        }}
      />
      <FormFieldError name="visitType" />
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }
