import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const VisitMediumSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Visit Medium for Primary State
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.VisitMedium}
        size="1"
        name="visitMedium"
      />
      <FormFieldError name="visitMedium" />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
