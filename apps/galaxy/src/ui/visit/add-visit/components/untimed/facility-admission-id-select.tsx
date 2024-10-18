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
  const [visitType, patient] = useWatch({
    control: form.control,
    name: ['visitType', 'patient'],
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Facility Admission ID</FormFieldLabel>
      <AsyncSelect
        fetchOptions={() => {
          if (!patient?.id) {
            return Promise.resolve({ state: 'success', data: [] })
          }
          return getFacilityAdmissionIdsOptionsAction(patient?.id)
        }}
        buttonClassName="h-6 w-full"
        field="facilityAdmissionId"
        disabled={!visitType}
      />
      <FormFieldError name={'facilityAdmissionId'} />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionDropdown }
