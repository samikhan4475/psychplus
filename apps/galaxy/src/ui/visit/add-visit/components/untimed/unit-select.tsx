'use client'

import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getUnitsGroupsAction } from '@/ui/visit/client-actions'
import { SchemaType } from '../../schema'

const UnitDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [
    serviceId,
    legal,
    patient,
    state,
    location,
    dateOfAdmission,
    admittingProvider,
    providerType,
  ] = useWatch({
    control: form.control,
    name: [
      'service',
      'legal',
      'patient',
      'state',
      'location',
      'dateOfAdmission',
      'admittingProvider',
      'providerType',
    ],
  })

  const isDisabled =
    !patient ||
    !state ||
    !location ||
    !legal ||
    !dateOfAdmission ||
    !admittingProvider ||
    !providerType

  const fetchOptions = useCallback(() => {
    if (!serviceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getUnitsGroupsAction({ serviceId, isUnit: true })
  }, [serviceId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Unit</FormFieldLabel>
      <AsyncSelect
        fetchOptions={fetchOptions}
        buttonClassName="h-6 w-full"
        field="unit"
        disabled={isDisabled}
      />
    </FormFieldContainer>
  )
}

export { UnitDropdown }
