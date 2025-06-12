import { I18nProvider } from 'react-aria-components'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const AccidentDate = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Accident Date</FormFieldLabel>
      <I18nProvider locale="en-US">
        <DatePickerInput yearFormat='YYYY' field="accidentDate" />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { AccidentDate }
