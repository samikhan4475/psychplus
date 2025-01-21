'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/client-actions'
import { SchemaType } from '../../schema'

const RoomDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [
    serviceId,
    legal,
    patient,
    state,
    service,
    location,
    dateOfAdmission,
    admittingProvider,
    dischargeDate,
    providerType,
    insuranceAuthorizationNumber,
    unit,
  ] = useWatch({
    control: form.control,
    name: [
      'service',
      'legal',
      'patient',
      'state',
      'service',
      'location',
      'dateOfAdmission',
      'admittingProvider',
      'dischargeDate',
      'providerType',
      'insuranceAuthorizationNumber',
      'unit',
    ],
  })
  const isDisabled =
    !patient ||
    !state ||
    !service ||
    !location ||
    !legal ||
    !dateOfAdmission ||
    !admittingProvider ||
    !dischargeDate ||
    !providerType ||
    !insuranceAuthorizationNumber ||
    !unit

  const fetchOptions = useCallback(() => {
    if (!serviceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getUnitsGroupsAction({ serviceId, isRoom: true })
  }, [serviceId])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Room</FormFieldLabel>
      <AsyncSelect
        buttonClassName="flex-1 h-6"
        fetchOptions={fetchOptions}
        field="room"
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { RoomDropdown }
