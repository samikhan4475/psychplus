import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Status</FormFieldLabel>
      <CodesetSelect
        name="vacationStatus"
        codeset={CODESETS.VacationStatus}
        size="1"
      />
      <FormFieldError name={'vacationStatus'} />
    </FormFieldContainer>
  )
}

export { StatusSelect }
