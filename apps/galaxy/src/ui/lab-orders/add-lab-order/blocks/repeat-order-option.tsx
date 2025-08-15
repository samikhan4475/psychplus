import { DateValue, parseDate } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { I18nProvider } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  DatePickerInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
  YesNoSelect,
} from '@/components'
import { getCalendarDateLabel, getLocalCalendarDate } from '@/utils'
import { LabOrderSchemaType } from '../lab-order-schema'
import { RecurrenceTypeOptions } from './types'

type RecurrenceValue =
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'ThreeMonths'
  | 'SixMonths'
const getDateString = (date?: DateValue): string | undefined =>
  date ? getCalendarDateLabel(date) : undefined
const RepeatOrderOption = () => {
  const form = useFormContext<LabOrderSchemaType>()
  const isRecurrentOrder = form.watch('isRecurrentOrder')
  const addIntervalToDateValue = (
    base: DateValue,
    recurrence: RecurrenceValue,
  ): DateValue => {
    switch (recurrence) {
      case 'Daily':
        return base.add({ days: 1 })
      case 'Weekly':
        return base.add({ weeks: 1 })
      case 'Monthly':
        return base.add({ months: 1 })
      case 'ThreeMonths':
        return base.add({ months: 3 })
      case 'SixMonths':
        return base.add({ months: 6 })
      default:
        return base.add({ days: 1 })
    }
  }

  const handleRecurrenceChange = (value: string) => {
    form.setValue('recurrenceType', value)
    if (!value) return
    const orderDateVal = form.getValues('orderDate')
    const computedStart = addIntervalToDateValue(
      getLocalCalendarDate(getDateString(orderDateVal)),
      value as RecurrenceValue,
    )
    form.setValue('repeatStartDate', computedStart, { shouldValidate: true })
  }
  return (
    <>
      <Flex direction="column">
        <BlockLabel required>Repeat Order</BlockLabel>
        <YesNoSelect field="isRecurrentOrder" />
      </Flex>

      {isRecurrentOrder === 'yes' && (
        <>
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Recurrence</FormFieldLabel>
            <SelectInput
              options={RecurrenceTypeOptions}
              field="recurrenceType"
              buttonClassName="h-6  w-full"
              className="h-6 w-full"
              onValueChange={(v) => handleRecurrenceChange(v)}
            />
            <FormFieldError name={`recurrenceType`} />
          </FormFieldContainer>
          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>Start Date</FormFieldLabel>
            <I18nProvider locale="en-US">
              <DatePickerInput yearFormat="YY" field="repeatStartDate" />
            </I18nProvider>
          </FormFieldContainer>

          <FormFieldContainer className="flex-1">
            <FormFieldLabel required>End Date</FormFieldLabel>
            <I18nProvider locale="en-US">
              <DatePickerInput yearFormat="YY" field="repeatEndDate" />
            </I18nProvider>
          </FormFieldContainer>
        </>
      )}
    </>
  )
}

export { RepeatOrderOption }
