import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'

const BLOCK_ID = 'doseAdminstered'

const BLOCK_TITLE = 'Dose Administered'

const BLOCK_OPTIONS = [
  {
    label: '56 mg',
    value: '56mg',
  },
  {
    label: '84 mg',
    value: '84mg',
  },
]
const DoseAdministeredField = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <RadioSelectSection
        label={BLOCK_TITLE}
        field={BLOCK_ID}
        options={BLOCK_OPTIONS}
        required
      />
      <FormFieldError name={BLOCK_ID} />
    </FormFieldContainer>
  )
}

export { DoseAdministeredField }
