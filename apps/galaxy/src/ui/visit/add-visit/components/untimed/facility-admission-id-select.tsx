import { useCallback } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getFacilityAdmissionIdsOptionsAction } from '@/ui/visit/actions/get-facility-admission-ids'
import { SchemaType } from '../../schema'

const FacilityAdmissionDropdown = () => {
  const form = useFormContext<SchemaType>()
  const patient = useWatch({
    control: form.control,
    name: 'patient',
  })
  const fetchOptions = useCallback(() => {
    if (!patient?.id)
      return Promise.resolve({
        state: 'success' as const,
        data: [{ label: 'Create New', value: 'createNew' }],
      })
    return getFacilityAdmissionIdsOptionsAction(patient?.id)
  }, [patient?.id])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Facility Admission ID</FormFieldLabel>
      <AsyncSelect
        fetchOptions={fetchOptions}
        buttonClassName="h-6 w-full"
        field="facilityAdmissionId"
        disabled
      />
      <FormFieldError name={'facilityAdmissionId'} />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionDropdown }
