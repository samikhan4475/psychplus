import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1" required>
        Status
      </FormFieldLabel>
      <CodesetSelect name="status" codeset={CODESETS.CustomerStatus} size="1" />
      <FormFieldError name="status" />
    </FormFieldContainer>
  )
}

export { StatusSelect }
