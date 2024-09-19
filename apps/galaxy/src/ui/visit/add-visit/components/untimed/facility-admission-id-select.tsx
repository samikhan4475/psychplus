import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const FacilityAdmissionDropdown = () => {
  const form = useFormContext<SchemaType>()
  const visitSequence = form.watch('visitSequence')

  const facilityAdmissionIdOptions = [
    {
      label: 'Create New',
      value: 'createNew',
    },
    {
      label: 'Facility Admission ID',
      value: 'facilityAdmissionId',
    },
  ]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Facility Admission ID</FormFieldLabel>
      <SelectInput
        field="facilityAdmissionId"
        options={facilityAdmissionIdOptions}
        buttonClassName="flex-1"
        disabled={!visitSequence}
      />
      <FormFieldError name={'facilityAdmissionId'} />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionDropdown }
