'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/actions/get-units-groups'
import { SchemaType } from '../../schema'

const GroupDropdown = () => {
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
    room,
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
      'room',
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
    !unit ||
    !room

  const fetchOptions = useCallback(() => {
    if (!serviceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getUnitsGroupsAction({ serviceId, isGroup: true })
  }, [serviceId])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Group</FormFieldLabel>
      <AsyncSelect
        fetchOptions={fetchOptions}
        buttonClassName="h-6 w-full"
        field="group"
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { GroupDropdown }
