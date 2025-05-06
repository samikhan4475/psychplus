import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, SelectInput } from '@/components'
import { intervalOptions } from './constants'
import { ScheduleTemplateSchemaType } from './schedule-report-form'

const IntervalSelect = () => {
  const { setValue } = useFormContext<ScheduleTemplateSchemaType>()

  const handleIntervalChange = (newValue: string) => {
    setValue('monthSelection', [])
    setValue('monthDateSelection', [])
    setValue('weekdaysSelection', [])
    setValue('hourSelection', [])
    setValue('minuteSelection', [])
    setValue('repeatInterval', newValue)
  }
  return (
    <FormFieldContainer>
      <SelectInput
        field="repeatInterval"
        className="w-full"
        buttonClassName="w-20 h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={intervalOptions}
        onValueChange={handleIntervalChange}
      />
      <FormFieldError name="repeatInterval" />
    </FormFieldContainer>
  )
}

export { IntervalSelect }
