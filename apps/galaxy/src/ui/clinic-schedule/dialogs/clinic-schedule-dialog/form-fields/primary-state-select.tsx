import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PrimaryStateSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required className="text-[12px]">
        Primary State
      </FormFieldLabel>
      <CodesetSelect codeset={CODESETS.UsStates} name="primaryState" size="1" />
      <FormFieldError name="primaryState" />
    </FormFieldContainer>
  )
}

export { PrimaryStateSelect }
