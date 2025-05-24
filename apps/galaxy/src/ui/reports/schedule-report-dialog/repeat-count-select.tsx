import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { repeatCountOptions } from './constants'

const RepeatCountSelect = () => {
  const { watch, setValue } = useFormContext()
  const handleIntervalChange = (newValue: string) => {
    setValue('monthSelection', [])
    setValue('monthDateSelection', [])
    setValue('weekdaysSelection', [])
    setValue('hourSelection', [])
    setValue('minuteSelection', [])
    setValue('repeatInterval', '')
    setValue('repeatCount', newValue)
  }
  return (
    <FormFieldContainer className="flex-row items-center ">
      <FormFieldLabel className="!text-1 mt-1 mr-1">Repeat Schedule Every</FormFieldLabel>
      <SelectInput
        field="repeatCount"
        className="w-full"
        buttonClassName="min-w-[120px] h-6 border-pp-gray-2 rounded-2 !outline-none"
        options={repeatCountOptions}
        onValueChange={handleIntervalChange}
        defaultValue={watch('repeatCount')}
      />
      <FormFieldError name="repeatCount" />
    </FormFieldContainer>
  )
}

export { RepeatCountSelect }
