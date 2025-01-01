import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const VisitStatusSelect = () => {
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const exclude = codes
    .filter((code) =>
      code.attributes?.find((attribute) => attribute.value === 'Timed'),
    )
    .map((code) => code.value)

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        exclude={exclude}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name={'visitStatus'} />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
