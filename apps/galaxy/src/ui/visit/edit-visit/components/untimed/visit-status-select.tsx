import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const VisitStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.AppointmentStatus}
        size="1"
        className="flex-1"
      />
      <FormFieldError name={'visitStatus'} />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
