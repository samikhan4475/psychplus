import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitMediumSelect = () => {
  const codes = useCodesetCodes(CODESETS.AppointmentType)

  const options = codes
    .filter((attr) =>
      attr.attributes?.find(
        (attr) => attr.name === 'Group' && attr.value === 'Primary',
      ),
    )
    .map((option) => {
      return {
        value: option.value,
        label: option.display,
      }
    })

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Medium</FormFieldLabel>
      <SelectInput
        options={options}
        field="visitMedium"
        buttonClassName="flex-1"
      />
      <FormFieldError name={'visitMedium'} />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
