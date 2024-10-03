import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitSequenceSelect = () => {
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)

  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'NonTimedServices',
      ),
    )
    .map((option) => ({
      value: option.value,
      label: option.display,
    }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <SelectInput
        field="visitSequence"
        buttonClassName="flex-1"
        options={options}
      />
      <FormFieldError name={'visitSequence'} />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
