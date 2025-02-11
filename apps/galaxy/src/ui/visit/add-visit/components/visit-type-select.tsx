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
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { VisitType } from '@/types'
import { getLocationServices } from '../../client-actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'
import {
  transformNonTimedVisitTypes,
  transformTimedVisitTypes,
} from '../transform'
import { SlotDetails } from '../types'
import { getCodesetDisplayName } from '@/utils'

const VisitTypeDropdown = ({ slotDetails }: { slotDetails?: SlotDetails }) => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const visitMediumCodes = useCodesetCodes(CODESETS.VisitMedium)
  const visitSequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
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
          const serviceVisitTypes = transformTimedVisitTypes(
            res.data[0]?.serviceVisitTypes ?? [],
          )
          setVisitTypes(serviceVisitTypes ?? [])
        }
      })
    }
  }, [locationId, serviceId])

  const options = useMemo(
    () =>
      visitTypes.map((visitType) => {
        const medium = getCodesetDisplayName(visitType.visitMedium, visitMediumCodes)
        const sequence = getCodesetDisplayName(visitType.visitSequence, visitSequenceCodes)
        return {
          label: isServiceTimeDependent
            ? `${visitType.typeOfVisit} | ${sequence} | ${medium}`
            : visitType.typeOfVisit,
          value: isServiceTimeDependent
            ? visitType.encouterType
            : visitType.visitTypeCode,
        }
      }),
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
