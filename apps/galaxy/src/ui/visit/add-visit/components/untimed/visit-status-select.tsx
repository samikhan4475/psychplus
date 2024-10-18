import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const VisitStatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-[3.8px]">
      <FormFieldLabel>Visit Status</FormFieldLabel>
      <CodesetSelect
        name="visitStatus"
        codeset={CODESETS.FacilityAppointmentStatus}
        size="1"
        className="h-6 w-full"
        disabled
      />
      <FormFieldError name={'visitStatus'} />
    </FormFieldContainer>
  )
}

export { VisitStatusSelect }
