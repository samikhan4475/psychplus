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

const VisitMediumSelect = () => {
  const form = useFormContext<SchemaType>()
  const visitSequence = form.watch('visitSequence')
  const codes = useCodesetCodes(CODESETS.AppointmentType)

  const isDisabled = !visitSequence

  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Primary',
      ),
    )
    .map((option) => {
      return {
        label: option.display,
        value: option.value,
      }
    })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <SelectInput
        field="visitMedium"
        options={options}
        buttonClassName="flex-1"
        disabled={isDisabled}
      />
      <FormFieldError name={'visitMedium'} />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
