import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const SubmittedDate = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Submission Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput field={`submittedDate`} isDisabled />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { SubmittedDate }
