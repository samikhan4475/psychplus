import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../schema'

const VisitSequenceSelect = () => {
  const form = useFormContext<SchemaType>()
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)
  const visitType = form.watch('visitType')

  const isDisabled = !visitType

  const items = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'NonTimedServices',
      ),
    )
    .map((option) => ({
      label: option.display,
      value: option.value,
    }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Sequence</FormFieldLabel>
      <SelectInput
        field="visitSequence"
        options={items}
        buttonClassName="flex-1"
        disabled={isDisabled}
      />
      <FormFieldError name={'visitSequence'} />
    </FormFieldContainer>
  )
}

export { VisitSequenceSelect }
