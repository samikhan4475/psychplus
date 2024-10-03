import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const FacilityAdmissionSelect = () => {
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
        disabled
      />
      <FormFieldError name={'facilityAdmissionId'} />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionSelect }
